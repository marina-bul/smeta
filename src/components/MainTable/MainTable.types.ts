export interface RowParams {
  id: number
  rowName: string
  salary: number
  equipmentCosts: number
  overheads: number
  estimatedProfit: number
  machineOperatorSalary: number
  mainCosts: number
  materials: number
  mimExploitation: number
  supportCosts: number
  total: number
}

export interface RowNode extends RowParams {
  parentId: number | null
  child: RowNode[]
}

export interface ChangeNodesResponse {
  changed: RowParams[]
  current: RowParams
}

export type RowType = 'new' | 'edited' | 'completed'