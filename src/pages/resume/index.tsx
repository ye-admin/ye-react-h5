import { useState } from 'react';
import styles from './index.module.less'

export default function Resume() {
  const [txt, settxt] = useState(1);

  //函数
  const handle = () => {
    settxt(txt => txt + 1);
    setTimeout(() => {
      console.log(txt);  //1
      settxt(txt => {
        console.log(txt); //2
        return txt;
      })
    }, 1000)
  };
  return <div className={styles.main}>
    <button style={{ width: "100px", height: '100px', color: "#f00" }} onClick={handle}>点击我</button>
    <div>{txt}</div>
  </div>
}
