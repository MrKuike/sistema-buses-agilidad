'use client';

import { useEffect, useMemo, useState } from 'react';
import style from './page.module.css';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';
import { DirectionsResponseJSON } from 'openrouteservice/dist/directions';
import { FaQuestionCircle } from 'react-icons/fa';

const getStreets = (directions: DirectionsResponseJSON) => {
	const segments = directions.routes[0].segments;
	const points: string[] = [];
	segments.forEach(segment => {
		const steps = segment.steps;
		steps.forEach(step => {
			step.name === '-' ||
				points.includes(step.name, points.length - 1) ||
				points.push(step.name);
		});
	});

	return points;
};

export default function Page() {
	const router = useRouter();
	const [points, setSelectedPoints] = useState<string[]>();
	const [ORSResponse, setORSResponse] = useState<
		DirectionsResponseJSON | undefined
	>();

	const Map = useMemo(
		() => dynamic(() => import('./CreateMap'), { ssr: false }),
		[],
	);

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const form = e.currentTarget as HTMLFormElement;
		const name = form.elements.namedItem('name') as HTMLInputElement;
		const hour = form.elements.namedItem('hour') as HTMLInputElement;

		if (!name.value || !hour.value || !points) {
			toast.error('Todos los campos son requeridos', { toastId: 'error' });
			return;
		}

		if (points.length < 2) {
			toast.error('Debe seleccionar al menos dos puntos', { toastId: 'error' });
			return;
		}

		const road = {
			name: name.value,
			hour: hour.value,
			points: points,
		};

		console.log(road, ORSResponse);
	};

	useEffect(() => {
		if (ORSResponse) {
			setSelectedPoints(getStreets(ORSResponse));
		} else {
			setSelectedPoints(undefined);
		}
	}, [ORSResponse]);

	return (
		<>
			<h3>Creación de ruta</h3>
			<form
				id='road-form'
				onSubmit={onSubmit}
			/>

			<div className={`${style.layout} gap-5 flex-1`}>
				<div className={`${style.form} bg-slate-100 p-2 rounded`}>
					<fieldset className='flex flex-col'>
						<label htmlFor='name'>Nombre de la ruta</label>
						<input
							type='text'
							id='name'
							form='road-form'
							className='border-2 border-slate-200 rounded px-1 py-2'
						/>
					</fieldset>
					<div>
						<span>Recorrido de la ruta</span>
						<ul
							className={`flex gap-2 w-full flex-col border-2 border-slate-200 rounded px-1 py-2 max-h-20 md:max-h-60 overflow-y-auto`}
						>
							{!points && (
								<li className='flex flex-col justify-center items-center h-full'>
									<FaQuestionCircle className='text-center text-gray-500' />
									<span className='text-center text-gray-500'>
										No existe recorrido
									</span>
									<span className='text-center text-xs text-gray-500'>
										(Seleccione al menos dos puntos en el mapa)
									</span>
								</li>
							)}
							{points && (
								<>
									{points.map((point, index) => (
										<li
											key={`${point}-${index}`}
											className='flex flex-col justify-between gap-3 bg-slate-50'
										>
											<div className='flex flex-col h-11 justify-center py-1 px-2'>
												{index === 0 && (
													<span className='text-xs text-ellipsis'>Inicio</span>
												)}
												{index === points.length - 1 &&
													points.length - 1 > 0 && (
														<span className='text-xs'>Final</span>
													)}
												<span>{point}</span>
											</div>
										</li>
									))}
								</>
							)}
						</ul>
					</div>
					<fieldset className='flex flex-col'>
						<label htmlFor='hour'>Horario de partida</label>
						<input
							type='time'
							id='hour'
							form='road-form'
							className='border-2 border-slate-200 rounded px-1 py-2 md:w-1/2'
						/>
					</fieldset>
				</div>
				<div
					className={`${style.map} w-full h-full flex-1 bg-slate-100 p-2 rounded`}
				>
					<Map
						setORSResponse={setORSResponse}
						ORSResponse={ORSResponse}
					/>
				</div>

				<div
					className={`${style.buttons} flex mt-auto gap-2 bg-slate-100 p-2 rounded`}
				>
					<button
						onClick={() => {
							router.back();
						}}
						className='flex-1 max-h-20 bg-slate-400 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded'
					>
						Cancelar
					</button>
					<button
						type='submit'
						form='road-form'
						className='flex-1 max-h-20 bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded'
					>
						Guardar
					</button>
				</div>
			</div>
		</>
	);
}
