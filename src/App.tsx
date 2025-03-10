import { Header } from './components/Header/Header'

import './App.style.scss'
import { Navbar } from './components/Navbar/Navbar'
import { useEffect } from 'react'
import { MainTable } from './components/MainTable/MainTable'


const eID = 148763

export function App() {

    // useEffect(() => {
    //     const createElement = async() => {
    //         const result = await fetch(`http://185.244.172.108:8081/v1/outlay-rows/entity/${eID}/row/create`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             equipmentCosts: 1750,
    //             estimatedProfit: 1209122.5,
    //             machineOperatorSalary: 0,
    //             mainCosts: 0,
    //             materials: 0,
    //             mimExploitation: 0,
    //             overheads: 108.07,
    //             parentId: null,
    //             rowName: "Южная строительная площадка",
    //             salary: 20348,
    //             supportCosts: 0
    //         })

    //         })
    //         return result
    //     }

    //     createElement()
        
    // }, [])

    // useEffect(() => {
    //     const fetchList = async() => {
    //         const response = await fetch(`http://185.244.172.108:8081/v1/outlay-rows/entity/${eID}/row/list`)
    //         const data = await response.json()
    //         return data
    //     }

    //     fetchList().then(data => console.log(data))
        
    // }, [])

    return (
        <div>
            <Header />
            <main>
                <Navbar />
                <MainTable />
            </main>
        </div>

    )
}
