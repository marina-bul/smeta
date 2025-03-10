import BackIcon from './icons/back.svg'
import BurgerIcon from './icons/burger.svg'

import styles from './Header.module.scss'

export const Header = () => {
  return (
    <header className={styles.header}>
      <BurgerIcon className={styles.icon} />
      <BackIcon className={styles.icon} />
      <span className={`${styles.link} ${styles.active}`}>Просмотр</span>
      <span className={styles.link}>Управление</span>
    </header>
  )
}