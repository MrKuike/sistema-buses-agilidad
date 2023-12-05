'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Driver } from '@/types';
import DriversList from './components/driversList';

export default function Page() {
	const router = useRouter();
	const [drivers, setDrivers] = useState<Driver[] | null>([]);

	useEffect(() => {
		const fetchDrivers = async () => {
			const response = await fetch('/api/drivers', {
				method: 'GET',
				cache: 'no-cache',
			});
      console.log(response);
      
			const data = await response.json();
			return data;
		};

		fetchDrivers().then(data => setDrivers(data));
	}, []);

	return (
		<>
			<h3>Lista de Conductores</h3>
			<DriversList drivers={drivers} />
			<button
				onClick={() => router.push('/drivers/create')}
				// href={`/drivers/create`}
				className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded mt-5'
			>
				+ Agregar
			</button>
		</>
	);
}
