import { useState, useCallback } from 'react'

import NewIcon from '../../icons/newIcon.svg'
import TrashIcon from '../../icons/trashIcon.svg'

import styles from './TableRow.module.scss'

import type { ChangeEvent, KeyboardEvent, FC } from 'react'

export interface RowCosts {
  id: number
  parentId: number | null
  rowName: string
  salary: number
  equipmentCosts: number
  overheads: number
  estimatedProfit: number
}

interface TableRowProps {
  mode: 'edited' | 'completed' 
  rowData: RowCosts
  onAddRow: (parentId: number | null ) => void
  onRemoveRow: (rowId: number ) => void
  onSubmit?: (rowData: RowCosts) => void
}


export const TableRow: FC<TableRowProps> = ({ mode, rowData, onAddRow, onRemoveRow, onSubmit }) => {

  const [fields, setFields] = useState(rowData)
  const [rowMode, setRowMode] = useState(mode)
  const [isActionsVisible, setIsActionsVisible] = useState(false)

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFields((prev) => ({ ...prev, [name]: value.replace(/^0+(?=\d)/, '') }));
  };

  const handleActionsHover = () => {
    if(rowMode === 'edited') return

    setIsActionsVisible(true)
  }

  const handleSubmit = useCallback((event: KeyboardEvent) => {
    if (event.key !== "Enter") return

    const numericValues = {
      ...fields,
      id: rowData.id,
      parentId: rowData.parentId,
      salary: Number(fields.salary) || 0,
      equipmentCosts: Number(fields.equipmentCosts) || 0,
      overheads: Number(fields.overheads) || 0,
      estimatedProfit: Number(fields.estimatedProfit) || 0
    };

    if(onSubmit) onSubmit(numericValues)

    setRowMode('completed')

  }, [fields, onSubmit]);

  return (
          <tr 
            className={styles[rowMode]} 
            onKeyDown={handleSubmit} 
            onDoubleClick={() => setRowMode('edited')}
          >

              <td 
                className={styles.iconContainer}
                onMouseEnter={handleActionsHover}
                onMouseLeave={() => setIsActionsVisible(false)}
              >
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

              </td>
              <td>
                <input 
                  type="text" 
                  name='rowName' 
                  value={fields.rowName}
                  readOnly={rowMode === 'completed'}
                  onChange={handleFieldChange}
                 />
              </td>
              <td>
                <input 
                  type="text" 
                  name='salary' 
                  value={fields.salary}
                  readOnly={rowMode === 'completed'}
                  onChange={handleFieldChange}
                 />
              </td>
              <td>
                <input 
                  type="text" 
                  name='equipmentCosts' 
                  value={fields.equipmentCosts}
                  readOnly={rowMode === 'completed'}
                  onChange={handleFieldChange}
                 />
              </td>
              <td>
                <input 
                  type="text" 
                  name='overheads' 
                  value={fields.overheads}
                  readOnly={rowMode === 'completed'}
                  onChange={handleFieldChange}
                 />
              </td>
              <td>
                <input 
                  type="text" 
                  name='estimatedProfit' 
                  value={fields.estimatedProfit}
                  readOnly={rowMode === 'completed'}
                  onChange={handleFieldChange}
                 />
              </td>

          </tr>

  )
}