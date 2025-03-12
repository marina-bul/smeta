import { RowNode, RowParams } from './MainTable.types'
import { ChangeNodesResponse } from "./MainTable.types";

class ServerActions {
  private eID
  private url

  constructor() {
    this.eID = 148763
    this.url = 'http://185.244.172.108:8081/'
  }

  async fetchRows () {
    try {
      const response = await fetch(`${this.url}/v1/outlay-rows/entity/${this.eID}/row/list`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Ошибка на сервере:', error)
      return []
    }
  }

  async addRow (parentId: number | null, rowParams: RowParams): Promise<ChangeNodesResponse> {
    try {
      const response = await fetch(`${this.url}/v1/outlay-rows/entity/${this.eID}/row/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...rowParams, parentId })
      });

      if(!response.ok) {
        console.error('Что-то пошло не так при создании строки. Попробуйте обновить приложение')
      }

      const result = await response.json()

      return result
    } catch (error) {
      console.error('Ошибка на сервере при создании строки:', error)
      throw error
    }
  }

  async removeRow (rowId: number) {
  try {
    const response = await fetch(`${this.url}/v1/outlay-rows/entity/${this.eID}/row/${rowId}/delete`, {
      method: 'DELETE'
    });

    if(!response.ok) {
      console.error('Что-то пошло не так при удалении строки. Попробуйте обновить приложение')
    }
  } catch (error) {
    console.error('Ошибка на сервере при удалении строки:', error)
  }
}

async editRow (rowId: number, rowParams: RowNode): Promise<ChangeNodesResponse> {
  try {
    const response = await fetch(`${this.url}/v1/outlay-rows/entity/${this.eID}/row/${rowId}/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rowParams)
    });

    if(!response.ok) {
      console.error('Что-то пошло не так при обновлении строки. Попробуйте обновить приложение')
    }

    const result = await response.json()

    return result
  } catch (error) {
    console.error('Ошибка на сервере при обновлении строки:', error)
    throw error
  }
}

}

class ClientActions {
  constructor() {}

  addNode (tree: RowNode[], parentId: number | null, newNode: RowNode): RowNode[] {
    if(tree.length === 0) return [newNode]

    return tree.map((node) => {
      if (node.id === parentId) {
        return {
          ...node,
          child: [...(node.child || []), newNode],
        }
      }
      if (node.child.length > 0) {
        return { ...node, child: this.addNode(node.child, parentId, newNode) }
      }
      return node
    })
  }

  editNode (tree: RowNode[], rowId: number, newNode: RowNode): RowNode[] {
    return tree.map((node): RowNode => {
      if(node.id === rowId) {
        return newNode
      } else if(node.child.length > 0) {
        return { ...node, child: this.editNode(node.child, rowId, newNode) }
      }
      return node
    })
  }

  removeNode = (tree: RowNode[], id: number): RowNode[] => {
    return tree
      .filter((node) => node.id !== id)
      .map((node) => ({
        ...node,
        child: this.removeNode(node.child, id),
      }));
  };
}


export const serverActions = new ServerActions()
export const clientActions = new ClientActions()
