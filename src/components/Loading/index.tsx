import React from 'react';
import styles from './index.module.less';
import { ActivityIndicator } from 'antd-mobile';

export default function Comp () {
  return (
    <div className={styles.container}>
      <ActivityIndicator
        text="页面加载中..."
        size="large"
      />
    </div>
  )
}