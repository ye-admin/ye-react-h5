/*
 * @Author: vapidity9 lmj9lmj@163.com
 * @Date: 2022-05-15 11:58:55
 * @LastEditors: vapidity9 lmj9lmj@163.com
 * @LastEditTime: 2022-05-19 22:52:50
 */
import { Route } from 'react-router-dom';
import loadable from '@loadable/component';
import Loading from '@/components/Loading';

const FallbackOption = { fallback: <Loading /> };

const Index = loadable(() => import('@/pages/index'), FallbackOption);
const Resume = loadable(() => import('@/pages/resume'), FallbackOption);
const Nofount = loadable(() => import('@/pages/nofount'), FallbackOption);

const devRoutes = []
const { REACT_APP_ENV } = process.env
if (REACT_APP_ENV === 'dev') {
  devRoutes.unshift({
    'path': '/',
    'name': 'Index',
    'exact': true,
    'component': Index,
    'title': '欢迎'
  })
}
export const routes = [
  ...devRoutes,
  {
    'path': '/resume',
    'name': 'resume',
    'title': '简历',
    'component': Resume,
  },
  {
    'path': '*',
    'name': 'Nofount',
    'title': '404',
    'component': Nofount,
  }
];

// 路由权限控制
export function RouteWithSubRoutes (route: any) {
  // 登录认证
  document.title = route.title || ''
  return (
    <Route
      exact={route.exact || false}
      path={route.path}
      render={props =>
        <route.component {...props} {...route} />
      }
    />
  )
}