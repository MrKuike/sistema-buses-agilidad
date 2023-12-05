'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const formatRun = (run: string) => {
	const cleanedRun = run.replace(/[^0-9kK]/g, '');
	const formattedRun =
		cleanedRun.length >= 7
			? cleanedRun.slice(0, -1).replace(/(\d)(?=(\d{3})+$)/g, '$1.') +
			  '-' +
			  cleanedRun.slice(-1).toUpperCase()
			: cleanedRun.toUpperCase();

	return formattedRun;
};

export default function Page() {
	const router = useRouter();
	const [formattedRun, setFormattedRun] = useState('');

	const handleRunChange = (event: React.ChangeEvent) => {
		const inputRun = (event.target as HTMLInputElement).value;
		const formattedInputRun = formatRun(inputRun);
		setFormattedRun(formattedInputRun);
	};

	const createDriver = (formData: FormData) => {
		const data = {
			run: formData.get('driver_run'),
			name: formData.get('driver_name'),
			licenseExpiration: '2023-12-05T05:32:12-09:30',
		};
		console.log(data);
		if (Object.values(data).some(value => !value)) {
			alert('Todos los campos son requeridos');
			return;
		}

		toast.loading('Creando Conductor', {
			toastId: 'create-driver',
		});

		fetch('/api/drivers', {
			method: 'POST',
			body: JSON.stringify({ data }),
		}).then(r => {
			console.log('r', r);
			if (r.status === 200) {
				toast.update('create-driver', {
					render: 'Conductor creado exitosamente',
					isLoading: false,
					type: 'success',
					autoClose: 3000,
				});
				router.replace('/drivers');
			} else {
				toast.update('create-driver', {
					render: 'Error al crear el conductor',
					isLoading: false,
					type: 'error',
					autoClose: 3000,
				});
			}
		});
	};

	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				createDriver(new FormData(e.target as HTMLFormElement));
			}}
			className='flex flex-col gap-5'
		>
			<fieldset className='flex flex-col'>
				<label htmlFor='run'>RUN del conductor</label>
				<input
					type='text'
					placeholder='Ej: 12.345.678-9'
					id='run'
					name='driver_run'
					value={formattedRun}
					onChange={handleRunChange}
					className='border-2 border-slate-200 rounded px-1 py-2'
				/>
			</fieldset>
			<fieldset className='flex flex-col'>
				<label htmlFor='name'>Nombre del conductor</label>
				<input
					type='text'
					id='name'
					name='driver_name'
					className='border-2 border-slate-200 rounded px-1 py-2'
				/>
			</fieldset>

			<div className='flex gap-2'>
				<button
					type='button'
					onClick={() => router.back()}
					className='flex-1 bg-slate-400 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mt-5'
				>
					Cancelar
				</button>
				<button
					type='submit'
					className='flex-1 bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mt-5'
				>
					Guardar
				</button>
			</div>
		</form>
	);
}
