import styles from './MainTable.module.scss'


export const MainTable = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        Строительно-монтажные работы
      </h3>
      <table className={styles.table}>

        <thead>
          <tr>
            <th>Уровень</th>
            <th>Наименование работ</th>
            <th>Основная з/п</th>
            <th>Оборудование</th>
            <th>Накладные расходы</th>
            <th>Сметная прибыль</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.tableRow}>
            <td></td>
            <td>Южная строительная площадка</td>
            <td>20 348</td>
            <td>1 750</td>
            <td>108.07</td>
            <td>1 209 122.5</td>
          </tr>
          <tr>
            <td></td>
            <td>Южная строительная площадка</td>
            <td>20 348</td>
            <td>1 750</td>
            <td>108.07</td>
            <td>1 209 122.5</td>
          </tr>
          <tr>
            <td></td>
            <td>Южная строительная площадка</td>
            <td>20 348</td>
            <td>1 750</td>
            <td>108.07</td>
            <td>1 209 122.5</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}