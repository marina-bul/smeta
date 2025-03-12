import { useEffect, useState } from 'react'

import { TableRow } from './elems/TableRow/TableRow'
import { serverActions, clientActions } from './MainTable.service'

import styles from './MainTable.module.scss'

import type { RowType, RowNode, RowParams } from './MainTable.types'


const EMPTY_ROW = {
  rowName: '',
  salary: 0,
  equipmentCosts: 0,
  overheads: 0,
  estimatedProfit: 0,
  machineOperatorSalary: 0,
  mainCosts: 0,
  materials: 0,
  mimExploitation: 0,
  supportCosts: 0,
  total: 0
}


export const MainTable = () => {
  const { addRow, editRow, removeRow, fetchRows } = serverActions

  const [rows, setRows] = useState<RowNode[]>([])


  const handleAddRow = (parentId: number | null = null, params?: RowParams ) => {
    if(!params) {
        const emptyNode = {
          parentId, 
          ...EMPTY_ROW, 
          child: [], 
          id: Date.now()
        }
        setRows((prev) => clientActions.addNode(prev, parentId, emptyNode ))
      return
    }

    addRow(parentId, params).then((data) => {
      const newNode = {...data.current, parentId: parentId, child: []}

      setRows((prev) => clientActions.editNode(prev, params.id, newNode ))
    })

  }

  const handleEditRow = ( rowData: RowNode ) => {

    editRow(rowData.id, rowData).then((data) => {
      const newNode = {...data.current, parentId: rowData.parentId, child: rowData.child}

      setRows((prev) => clientActions.editNode(prev, data.current.id, newNode))
    })

  }

  const handleRemoveRow = ( id: number ) => { 
    removeRow(id).then(() => {


      setRows((prev) => clientActions.removeNode(prev, id));
    }).catch((error) => {
      console.error('Ошибка при удалении строки:', error);
    });
  }

  const handleSubmit = (rowData: RowNode, mode: RowType) => {
    mode === 'new'
    ? handleAddRow(rowData.parentId, rowData) 
    : handleEditRow(rowData)
  }

  useEffect(() => {
    fetchRows().then(data => {
      data.length > 0 ? setRows([...data]) : handleAddRow()
    })

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
              mode={row.rowName === '' ? 'new' : 'completed'} 
              rowData={row} 
              level={0}
              onAddRow={handleAddRow} 
              onRemoveRow={handleRemoveRow}
              onSubmit={handleSubmit}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}