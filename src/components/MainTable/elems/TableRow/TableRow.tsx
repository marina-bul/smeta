import { useState, useCallback } from 'react'

import NewIcon from '../../icons/newIcon.svg'
import TrashIcon from '../../icons/trashIcon.svg'

import styles from './TableRow.module.scss'

import type { ChangeEvent, KeyboardEvent, FC } from 'react'
import type { RowType, RowNode } from '../../MainTable.types'

interface TableRowProps {
  mode: RowType 
  rowData: RowNode
  level: number
  onAddRow: (parentId: number | null ) => void
  onRemoveRow: (rowId: number ) => void
  onSubmit?: (rowData: RowNode, mode: RowType) => void
}

export const TableRow: FC<TableRowProps> = ({ 
  mode, 
  rowData, 
  level,
  onAddRow, 
  onRemoveRow, 
  onSubmit 
}) => {

  const [fields, setFields] = useState({
    rowName: rowData.rowName,
    salary: rowData.salary,
    equipmentCosts: rowData.equipmentCosts,
    overheads: rowData.overheads,
    estimatedProfit: rowData.estimatedProfit,
  })
  const [rowMode, setRowMode] = useState(mode)
  const [isActionsVisible, setIsActionsVisible] = useState(false)

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFields((prev) => ({ ...prev, [name]: value.replace(/^0+(?=\d)/, '') }));
  };

  const handleActionsHover = () => {
    if(['edited','new'].includes(rowMode)) return

    setIsActionsVisible(true)
  }

  const handleDblClick = () => {
    if(rowMode === 'completed') {
      setRowMode('edited')
    }
  }

  const handleSubmit = useCallback((event: KeyboardEvent) => {
    if (event.key !== "Enter") return

    const modifiedValues = {
      ...rowData,
      rowName: fields.rowName,
      salary: Number(fields.salary) || 0,
      equipmentCosts: Number(fields.equipmentCosts) || 0,
      overheads: Number(fields.overheads) || 0,
      estimatedProfit: Number(fields.estimatedProfit) || 0
    };

    if(onSubmit) onSubmit(modifiedValues, rowMode)

    setRowMode('completed')

  }, [fields, onSubmit]);

  return (
    <>
      <tr 
        className={styles[rowMode]} 
        onKeyDown={handleSubmit} 
        onDoubleClick={handleDblClick}
      >
        <td 
          style={{ paddingLeft: `${level * 20}px` }}
          onMouseEnter={handleActionsHover}
          onMouseLeave={() => setIsActionsVisible(false)}
        >
          <div>
            {isActionsVisible ? (
                <div className={styles.actions}>
                  <NewIcon 
                    className={styles.icon} 
                    onClick={() => onAddRow(rowData.id)} 
                  />
                  <TrashIcon 
                    className={styles.icon} 
                    onClick={() => onRemoveRow(rowData.id)} 
                  />
                </div>
              ) : (
                <NewIcon className={styles.icon} />
              )
            }
          </div>
        </td>


        {Object.entries(fields).map(([key, value]) => (
          <td>
            <input 
              type="text" 
              className={styles.input}
              name={key}
              value={value}
              readOnly={rowMode === 'completed'}
              onChange={handleFieldChange}
            />
          </td>
        ))}

      </tr>

      {rowData.child.length > 0 &&
        rowData.child
          .map((child) => (
            <TableRow 
              key={child.id} 
              rowData={child} 
              mode={child.rowName === '' ? 'new' : 'completed'}
              level={level + 1}
              onAddRow={onAddRow}
              onRemoveRow={onRemoveRow}
              onSubmit={onSubmit}
            />
          ))}
    </>
  )
}