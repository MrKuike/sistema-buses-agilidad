'use client'

import { useRouter } from "next/navigation";
import { FaRoute } from "react-icons/fa";
import { getRoads } from "../../lib/fetch"

export default function Page() {
    const router = useRouter()
    const roads = getRoads()

    return (<>
        <h3>Lista de rutas</h3>
        
        <ul className="flex flex-col bg-slate-100 rounded-lg p-2">
            {roads.map((road) => (
                <li key={road.id} className="grid rounded bg-white p-2 grid-rows-1 grid-cols-3">
                    <span className="text-left text-2xl self-center font-medium">{road.name}</span>
                    <div className="grid grid-rows-2 grid-cols-2 justify-end text-sm text-left">
                        <span>Inicio:</span>
                        <span>{road.interestPoints[0].street}</span>
                        <span>Final:</span>
                        <span>{road.interestPoints[road.interestPoints.length - 1].street}</span>
                    </div>
                    <div className="flex flex-row-reverse">
                        <button className="bg-slate-500 hover:bg-slate-300 text-white font-bold py-2 px-4 rounded"><FaRoute /></button>   
                    </div>
                </li>
            ))}
        </ul>
        <button onClick={() => router.push('/roads/create')} className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mt-5">+ Agregar</button>
    </>)
}