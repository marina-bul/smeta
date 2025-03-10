import { useEffect, useState } from 'react'

import styles from './MainTable.module.scss'
import { RowCosts, TableRow } from './elems/TableRow/TableRow'


export const MainTable = () => {
  const [rows, setRows] = useState<RowCosts[]>([])

  const addEmptyRow = (parentId: number | null = null ) => {
    setRows((prev) => [...prev, {
      parentId,
      id: Date.now(),
      rowName: '',
      salary: 0,
      equipmentCosts: 0,
      overheads: 0,
      estimatedProfit: 0,
    }])
  }

  const handleEditRow = ( rowData: RowCosts ) => {
    setRows((prev) => {
      const index = prev.findIndex((row) => row.id === rowData.id)
      prev[index] = rowData

      return prev
    })
  }

  const handleRemoveRow = ( id: number ) => {
    setRows((prev) => {
      return prev.filter((row) => row.id !== id)
    })
  }

  console.log(rows)

  useEffect(() => {
    const rowData = []

    if(rowData.length === 0) addEmptyRow()
  }, [])

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
          {rows.map((row) => (
            <TableRow 
              key={row.id}
              mode={row?.rowName === '' ? 'edited' : 'completed'} 
              rowData={row} 
              onAddRow={addEmptyRow} 
              onRemoveRow={handleRemoveRow}
              onSubmit={handleEditRow}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}