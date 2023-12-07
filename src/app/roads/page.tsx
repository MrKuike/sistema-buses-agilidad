'use client';

import { FaRoute } from 'react-icons/fa';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { RoadsResponse } from '@/types';

export default function Page() {
	const [roads, setRoads] = useState<RoadsResponse[]>([]);

	useEffect(() => {
		fetch('/api/roads', { method: 'GET' })
			.then(res => res.json())
			.then(data => {
				setRoads(data);
			});
	}, []);

	return (
		<>
			<h3>Lista de rutas</h3>

			<ul className='flex flex-col bg-slate-100 rounded-lg p-2'>
				{roads.map(road => {
					const time = new Date(road.time).toLocaleTimeString('es-CL', {
						hour: '2-digit',
						minute: '2-digit',
					});

					return (
						<li
							key={road.name}
							className='grid rounded bg-white p-2 grid-rows-1 grid-cols-3'
						>
							<div className='flex flex-col'>
								<span className='text-left text-2xl font-medium'>
									{road.name}
								</span>
								<span className='text-left text-sm font-normal'>
									{`Horario de partida ${time}`}
								</span>
							</div>

							<div className='grid grid-rows-2 grid-cols-2 justify-end text-sm text-left'>
								<span>Inicio:</span>
								<span>{road.InterestsPoints[0].street}</span>
								<span>Final:</span>
								<span>
									{road.InterestsPoints[road.InterestsPoints.length - 1].street}
								</span>
							</div>
							<div className='flex flex-row-reverse'>
								<Link
									href={`/roads/${road.id}`}
									className='bg-slate-500 hover:bg-slate-300 text-white font-bold py-2 px-4 rounded grid place-items-center'
								>
									<FaRoute />
								</Link>
							</div>
						</li>
					);
				})}
			</ul>
			<Link
				href='/roads/create'
				className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mt-5 grid place-items-center'
			>
				+ Agregar
			</Link>
		</>
	);
}
