import UseWindowSize from '@/utils/uHook'
import styles from './index.module.less'

export default function Resume () {
  const { width, height } = UseWindowSize()
  console.log(width, height);
  return <div className={styles.main}>
    <header></header>
  </div>
}
