import axios from 'axios'
import { Toast } from 'antd-mobile'
import { storage } from '../utils';
import { JudgeAgent } from '@/utils/device';

const instance = axios.create({
  timeout: 10000,
  withCredentials: true // 允许跨域设置cookies
})

type optionsType = {
  data?: any,
  params?: any,
  headers?: any,
  dataType?: 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream',
  type?: 'GET' | 'POST' | 'DELETE' | 'PUT',
  showLoading?: boolean,
  loadingText?: string,
  skipException?: boolean,
};

/**
 * 同步调用方式
 * @param {string} url 地址
 * @param {object} options
 * @param {object} options.data body业务参数
 * @param {object} options.params 查询字符串参数
 * @param {object} options.headers 公用请求头参数
 * @param {string} options.dataType 返回数据类型
 * @param {string} options.type 请求类型
 * @param {boolean} options.showLoading 是否展示loading，默认true
 * @param {string} options.loadingText loading文案，默认loading...
 * @param {boolean} options.skipException 默认fasle-是否跳过统一异常处理:
 * @returns {Promise<any>}
 */
export function awaitTo(url: string, options: optionsType) {
  return http(url, options).then((res: any) => [null, res]).catch((err: any) => [err, null])
}

export default function http(url: string, options: optionsType): Promise<any> {
  var { pageEnv } = new JudgeAgent();

  const {
    data = {},
    params = {},
    headers = {},
    dataType = 'json',
    type = 'GET',
    showLoading = true,
    loadingText = 'loading...',
    skipException = false
  } = options;

  if (!url) {
    console.error('接口地址不能为空');
    return new Promise((resolve, reject) => { reject(null) });
  }

  const token = storage('token') || '';
  // 设置公共参数
  instance.defaults.headers = {
    'Content-Type': 'application/json; charset=UTF-8',
    'token': token,
    'subject': 'MUSIC_APP',
    'os-type': pageEnv,
    'version': 'v1.0.0',
    'operatorId': '',
    'app-id': 'h5',
    'Cache-Control': 'no-cache',
  }

  if (showLoading) {
    Toast.loading(loadingText, 0);
  }

  return new Promise((resolve, reject) => {
    instance
      .request({
        method: type,
        url: url,
        params: params,
        data: data,
        responseType: dataType,
        headers, // 设置默认请求头
      })
      .then((res) => {
        showLoading && Toast.hide();
        const code = res.data && res.data.code;
        const isSuccess = code === 0;
        if (isSuccess) {
          /**
           * 正常请求
           */
          if (res.data && res.data.payload) {
            resolve(res.data.payload);
          } else {
            console.log(url, ' -- 返回数据异常！')
            resolve(true);
          }
        } else if (skipException) {
          /**
           * 接口成功
           * 请求数据异常
           * 跳过统一异常处理
           * 将数据返回自行处理
           */
          reject(res.data)
        } else {
          /**
           * 接口成功
           * 请求数据异常
           * 统一异常处理
           */
          Toast.fail(res.data?.errors || '接口异常', 2)
          reject(false)
        }
      })
      .catch((error) => {
        showLoading && Toast.hide()
        let message = ''
        switch (error.response && error.response.status) {
          case 401:
            message = '登录失效'
            break
          case 403:
            message = '请求接口太快请稍后再试！'
            break
          case 404:
            message = '服务异常请稍后再试！'
            break
          default:
            message = '网络异常请稍后再试！'
        }
        if (skipException) {
          reject({ message })
        } else {
          Toast.fail(message || '接口异常', 2)
          reject(null)
        }
      })
  })
}
