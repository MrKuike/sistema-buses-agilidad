'use client'

import { useEffect, useState } from "react";

export default function Page() {
    const [point, setSelectedPoint] = useState('')
    const [road, setSelectedRoad] = useState([])

    const addPoint = () => {
        setSelectedRoad([])
    }

    return (<>
        <h2>Creando rutas</h2>
        <div>
            <ul>
            {road.map((point) => 
                <li>
                    <span>{point}</span>
                </li>)}
            </ul>
            
            <input type="text"/>
            <button> + </button>
        </div>
    </>)
}
