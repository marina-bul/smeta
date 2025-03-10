import { Header } from './components/Header/Header'
import { Navbar } from './components/Navbar/Navbar'
import { MainTable } from './components/MainTable/MainTable'

import './App.style.scss'


const eID = 148763

export function App() {
    return (
        <>
            <Header />
            <main>
                <Navbar />
                <MainTable />
            </main>
        </>

    )
}
