
import React from 'react';
import styles from './index.module.less';
import img404 from '@/assets/images/404.png';

const NoFount = () => {
  return (
    <div className={styles.container}>
      <img src={img404} alt='' />
      <div className={styles.text}>无效页面</div>
    </div>
  );
}

export default NoFount;
