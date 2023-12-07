'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const colores = [
	{ value: 'blue', label: 'Azul' },
	{ value: 'cyan', label: 'Cyan' },
	{ value: 'green', label: 'Verde' },
	{ value: 'orange', label: 'Naranjo' },
	{ value: 'red', label: 'Rojo' },
	{ value: 'yellow', label: 'Amarillo' },
];

export default function Page() {
	const router = useRouter();

	async function create(formData: FormData) {
		const data = {
			brand: formData.get('brand'),
			color: formData.get('color'),
			model: formData.get('model'),
			plate: formData.get('plate'),
			seats: Number(formData.get('seats')),
		};

		if (Object.values(data).some(value => !value)) {
			alert('Todos los campos son requeridos');
			return;
		}

		toast.loading('Creando Bus', {
			toastId: 'create-bus',
		});
		fetch('/api/busses', {
			method: 'POST',
			body: JSON.stringify({ data }),
		}).then(r => {
			console.log('r', r);
			if (r.status === 200) {
				toast.update('create-bus', {
					render: 'Bus creado exitosamente',
					isLoading: false,
					type: 'success',
					autoClose: 3000,
				});
				router.replace('/busses');
			} else {
				toast.update('create-bus', {
					render: 'Error al crear el bus',
					isLoading: false,
					type: 'error',
					autoClose: 3000,
				});
			}
		});
	}

	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				create(new FormData(e.target as HTMLFormElement));
			}}
			className='flex flex-col gap-2	'
		>
			<fieldset className='flex flex-col'>
				<label htmlFor='plate'>Patente del bus</label>
				<input
					type='text'
					placeholder='Ej: AB.CD.12'
					id='plate'
					name='plate'
					className='border-2 border-slate-200 rounded px-1 py-2'
				/>
			</fieldset>
			<fieldset className='flex flex-col'>
				<label htmlFor='color'>Color del bus</label>
				<select
					name='color'
					id='color'
					className='border-2 border-slate-200 rounded px-1 py-2'
				>
					{colores.map(color => (
						<option
							key={color.value}
							value={color.value}
						>
							{color.label}
						</option>
					))}
				</select>
			</fieldset>
			<fieldset className='flex flex-col'>
				<label htmlFor='seats'>Número de asientos del bus</label>
				<input
					type='number'
					placeholder='Ej: 40'
					id='seats'
					name='seats'
					defaultValue={0}
					min={0}
					max={100}
					className='border-2 border-slate-200 rounded px-1 py-2'
				/>
			</fieldset>
			<fieldset className='flex flex-col'>
				<label htmlFor='brand'>Marca del bus</label>
				<input
					type='text'
					placeholder='Ej: Mercedes-Benz'
					id='brand'
					name='brand'
					className='border-2 border-slate-200 rounded px-1 py-2'
				/>
			</fieldset>
			<fieldset className='flex flex-col'>
				<label htmlFor='model'>Modelo del bus</label>
				<input
					type='text'
					placeholder='Ej: 0500RSD'
					id='model'
					name='model'
					className='border-2 border-slate-200 rounded px-1 py-2'
				/>
			</fieldset>

			<div className='flex gap-2'>
				<button
					type='button'
					onClick={e => {
						e.preventDefault();
						router.back();
					}}
					className='flex-1 bg-slate-400 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded transition-colors'
				>
					Cancelar
				</button>
				<button
					type='submit'
					className='flex-1 bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded transition-colors'
				>
					Guardar
				</button>
			</div>
		</form>
	);
}
