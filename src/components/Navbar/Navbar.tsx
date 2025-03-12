import ItemIcon from './icons/navitem.svg'
import ArrowIcon from './icons/arrow.svg'

import styles from './Navbar.module.scss'

const navLinks = [
  { label: 'По проекту' },
  { label: 'Объекты' },
  { label: 'РД' },
  { label: 'МТО' },
  { label: 'СМР', isActive: true },
  { label: 'График' },
  { label: 'МиМ' },
  { label: 'Рабочие' },
  { label: 'Капвложения' },
  { label: 'Бюджет' },
  { label: 'Финансирование' },
  { label: 'Панорамы' },
  { label: 'Камеры' },
  { label: 'Поручения' },
  { label: 'Контрагенты' }
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
          <li 
            className={`${styles.nav_link} ${link.isActive && styles.active}`} 
            key={link.label}
          >
            <ItemIcon />
            <span>{link.label}</span>
          </li>
        ))}
      </ul>
    </nav>
  )
}