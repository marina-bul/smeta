import ItemIcon from './icons/navitem.svg'
import ArrowIcon from './icons/arrow.svg'

import styles from './Navbar.module.scss'

const navLinks = [
  'По проекту',
  'Объекты',
  'РД',
  'МТО',
  'СМР',
  'График',
  'МиМ',
  'Рабочие',
  'Капвложения',
  'Бюджет',
  'Финансирование',
  'Панорамы',
  'Камеры',
  'Поручения',
  'Контрагенты'
]



export const Navbar = () => {
  return (
    <nav className={styles.container}>
      <div className={styles.title}>
        <div className={styles.text}>
          <p>Название проекта</p>
          <p className={styles.note}>Аббревиатура</p>
        </div>
        
        <ArrowIcon />
      </div>
      <ul className={styles.list}>
        {navLinks.map((link) => (
          <li className={styles.navLink} key={link}>
            <ItemIcon />
            <span>{link}</span>
          </li>
        ))}
      </ul>
    </nav>
  )
}