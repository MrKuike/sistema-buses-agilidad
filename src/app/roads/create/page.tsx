'use client';

import { useState } from 'react';
import style from './page.module.css';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function Page() {
	const router = useRouter();
	const [points, setSelectedPoints] = useState<string[]>();

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

		console.log(road);
	};

	const removePoint = (index: number) => {
		if (points) {
			const newPoints = points.filter((_, i) => i !== index);
			setSelectedPoints(newPoints);
		}
	};

	const addPoint = (e: React.FormEvent) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const street = form.street as HTMLInputElement;

		if (street && street.value) {
			if (!points) {
				setSelectedPoints([street.value]);
				street.value = '';
				return;
			}
			setSelectedPoints([...points, street.value]);
			street.value = '';
		}
	};

	return (
		<>
			<h3>Creación de ruta</h3>
			<form
				id='road-form'
				onSubmit={onSubmit}
			/>
			<form
				id='point-form'
				onSubmit={addPoint}
			/>

			<div className={`${style.layout} gap-5`}>
				<div className={style.form}>
					<fieldset className='flex flex-col'>
						<label htmlFor='name'>Nombre de la ruta</label>
						<input
							type='text'
							id='name'
							form='road-form'
							className='border-2 border-slate-200 rounded px-1 py-2'
						/>
					</fieldset>
					{points && (
						<div>
							<span>Puntos de la ruta</span>
							<ul
								className={`flex gap-2 w-full flex-col border-2 border-slate-200 rounded px-1 py-2 max-h-20 md:max-h-60 overflow-y-auto`}
							>
								{points.map((point, index) => (
									<li
										key={index}
										className='flex justify-between items-center'
									>
										<div className='flex flex-col'>
											{index === 0 && <span className='text-xs'>Inicio</span>}
											{index === points.length - 1 && points.length - 1 > 0 && (
												<span className='text-xs'>Final</span>
											)}
											<span>{point}</span>
										</div>
										<button
											onClick={() => {
												removePoint(index);
											}}
											className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded'
										>
											-
										</button>
									</li>
								))}
							</ul>
						</div>
					)}
					<fieldset>
						<label htmlFor='street'>Agregar punto</label>
						<div className='flex gap-2'>
							<input
								type='text'
								id='street'
								className='border-2 border-slate-200 rounded px-1 py-2 flex-1'
								form='point-form'
							/>
							<button
								type='submit'
								form='point-form'
								className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded'
							>
								+
							</button>
						</div>
					</fieldset>
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

				<iframe
					className={`${style.map} w-full h-full flex-1 rounded`}
					src='https://maps.openrouteservice.org/#/place/@-70.3004837036133,-18.47118343551702,14'
				></iframe>

				<div className={`${style.buttons} flex mt-auto gap-2`}>
					<button
						onClick={() => {
							router.back();
						}}
						className='flex-1 max-h-20 bg-slate-400 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mt-5'
					>
						Cancelar
					</button>
					<button
						type='submit'
						form='road-form'
						className='flex-1 max-h-20 bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mt-5'
					>
						Guardar
					</button>
				</div>
			</div>
		</>
	);
}
