import React from 'react';
import styles from './index.module.less';
import Portal from '@/components/Portal';

interface Greeting {
  visible: boolean;
  onCancel: () => void;
  onOk: () => void;
  title?: string;
  content?: string;
  okText?: string;
}

export default function Comp (props: Greeting) {
  const { visible, onCancel, onOk,
    title = '提示',
    content = '',
    okText = '确定',
  } = props;

  const stopClick = (e: any) => { e.stopPropagation(); }

  const renderDom = (
    <Portal>
      <div className={styles.container}
        onClick={onCancel}
      >
        <div className={styles.window} onClick={stopClick}>
          <div className={styles.title}>{title}</div>
          <div className={styles.content}>{content}</div>
          <div className={styles.button}
            onClick={onOk}
          >{okText}</div>
        </div>
      </div>
    </Portal>
  )
  return visible ? renderDom : null;
}