'use client'

import { useEffect, useState } from "react";

export default function Page() {
    const [points, setSelectedPoints] = useState<string[]>()

    const addPoint = (e: React.FormEvent) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const street = form.street as HTMLInputElement
        
        if (street && street.value) {
            if (!points) {
                setSelectedPoints([street.value])
                street.value = ''
                return
            }
            setSelectedPoints([...points, street.value])
            street.value = ''
        }
    }

    return (<>
        <h3>Creación de ruta</h3>
        <form id="road-form"/>
        <form id="point-form" onSubmit={addPoint}/>

        <div className="flex flex-col gap-5">
        <fieldset className="flex flex-col">
            <label htmlFor="name">Nombre de la ruta</label>
            <input 
                type="text" 
                id="name" 
                form="road-form"
                className="border-2 border-slate-200 rounded px-1 py-2"/>
        </fieldset>
        {points && 
            <div>
                <span>Puntos de la ruta</span>
                <ul className="flex gap-2 w-full flex-col border-2 border-slate-500 rounded px-1 py-2 ">
                    {points.map((point, index) => (
                        <li key={index} className="flex justify-between items-center">
                            <span>{point}</span>
                            <button className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">
                                -
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        }
        <fieldset>
            <label htmlFor="street">Agregar punto</label>
            <div className="flex gap-2">
                <input 
                    type="text" 
                    id="street" 
                    className="border-2 border-slate-200 rounded px-1 py-2 flex-1"
                    form="point-form"/>
                <button 
                    type="submit"
                    form="point-form"
                    className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded">
                    +
                </button>
            </div>
        </fieldset>
        <div className="flex gap-2">
            <button 
                className="flex-1 bg-slate-400 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mt-5">
                Cancelar
            </button>
            <button className="flex-1 bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mt-5">
                Guardar
            </button>
        </div>
    </div>
    </>)
}
