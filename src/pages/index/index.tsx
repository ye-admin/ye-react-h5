/*
 * @Author: vapidity9 lmj9lmj@163.com
 * @Date: 2022-05-15 11:58:55
 * @LastEditors: vapidity9 lmj9lmj@163.com
 * @LastEditTime: 2022-05-19 22:47:19
 * @FilePath: /ye-react-h5/src/pages/index/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useCallback } from 'react';
import styles from './index.module.less';
import { routes } from '@/router';
import { NavLink } from 'react-router-dom';
import icon_copyright from '@/assets/images/copyright.png';

export default function Comp () {

  const defaultMessage = 'ye-h5';

  const Item = useCallback(({ title, path }) => (
    <div className={styles.item}>
      <NavLink to={path} activeClassName="active">
        {`${title}`}
      </NavLink>
    </div>), []);

  return (<div className={styles.container}>
    <div className={styles.content}>
      <div className={styles.title}>页面导航</div>
      <div className={styles.list}>
        {
          routes.map((item) => {
            if (item.name !== "Index" && item.name !== "Nofount") {
              return (<Item key={item.name} title={item.title} path={item.path} />)
            }
            return null;
          })
        }
      </div>
    </div>
    <div className={styles.footer}>
      <span>{"copyright "}</span>
      <img src={icon_copyright} alt='' />
      <span>{`${new Date().getFullYear()} ${defaultMessage} v${VERSION}`}</span>
    </div>
  </div>)
}