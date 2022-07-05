import moment from 'moment';

export function storage (key: string, value?: any) {
  if (value !== undefined) {
    localStorage.setItem(key, JSON.stringify(value));
    return null;
  }
  const output = localStorage.getItem(key) || "null";
  return JSON.parse(output);
}

/**
 * 会话存储
 * @param key 
 * @param value 
 * @returns 
 */
export function session (key: string, value?: any) {
  if (value !== undefined) {
    sessionStorage.setItem(key, JSON.stringify(value));
    return null;
  }
  const output = sessionStorage.getItem(key) || "null";
  return JSON.parse(output);
}

/**
 * 大多数moment格式：2021-07-21 12:21:12
 * @param time 
 * @returns 
 */
export function customTimeFormat (time: any): string {
  if (time && typeof time === 'number') {
    return moment(time).format('YYYY-MM-DD HH:mm:ss');
  }
  return '';
}

/**
 * 将网络获取省市区转换成Picker需要的格式
 * @param data any[];
 * @returns any[];
 * 
 */
export function formatRegion (data: any[]): any[] {
  /**
  * provinceName:"",
  * citys:[{
  *      cityName:"",
  *       cityCode:"",
  *      countys:[{
  *          countyName:"",
  *           countyCode:"",
  *      }]
  * }]
  */
  /**
   *  "value": "330900",
      "label": "舟山市hahahahah哈哈哈哈哈哈",
      "children": [{
          "value": "330921",
          "label": "岱山县",
          "children": []
   */
  const ret: any[] = [];
  if (!Array.isArray(data) || !data.length) {
    console.error("formatRegion 入参错误:", data);
    return ret;
  }
  for (let i = 0; i < data.length; i++) {
    const first = { value: '', label: '', children: [] as any[] };
    first['value'] = data[i].provinceName;
    first['label'] = data[i].provinceName;
    for (let j = 0; j < data[i].citys.length; j++) {
      const second = { value: '', label: '', children: [] as any[] };
      //value不能重复，没办法拼上code，选中后截取掉&后边
      second['value'] = data[i].citys[j].cityName + '&' + data[i].citys[j].cityCode;
      second['label'] = data[i].citys[j].cityName;
      for (let k = 0; k < data[i].citys[j].countys.length; k++) {
        const thrid = { value: '', label: '', children: [] };
        //value不能重复，没办法拼上code，选中后截取掉&后边
        thrid['value'] = data[i].citys[j].countys[k].countyName + '&' + data[i].citys[j].countys[k].countyCode;
        thrid['label'] = data[i].citys[j].countys[k].countyName;
        second['children'].push(thrid);
      }
      first['children'].push(second);
    }
    ret.push(first);
  }
  return ret;
}

/**
 * 为了修正${formatRegion}方法拼接的&code
 */
export function selectedRegionFix (data: any): any {
  const ret: string[] = [];
  if (!data) return ret;
  for (let i = 0; i < data.length; i++) {
    const targetIndex = data[i].indexOf('&');
    if (targetIndex > -1) {
      ret.push(data[i].substring(0, targetIndex));
    } else {
      ret.push(data[i]);
    }
  }
  return ret;
}