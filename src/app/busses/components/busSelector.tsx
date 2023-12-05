'use client';

import { useRouter } from 'next/navigation';
import BusItem from './busItem';
import { Busses } from '@/types';
import { useEffect, useState } from 'react';
import { TailSpin } from 'react-loading-icons';

interface BuildTableProps {
	data: Busses[] | null;
	handleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	selectedPlate: string;
}

function BuildTable({ data, handleSelect, selectedPlate }: BuildTableProps) {
	if (!data) {
		return (
			<div className='h-full grid place-content-center'>
				<TailSpin className='stroke-slate-700 stroke-2' />
			</div>
		);
	}

	return (
		<div className='grid auto-rows-max grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-2 p-2 h-full overflow-y-auto'>
			{data.map(bus => (
				<BusItem
				select={handleSelect}
					selected={selectedPlate === bus.plate}
					key={bus.plate}
					bus={bus}
				/>
			))}
		</div>
	);
}

interface BusSelectorProps {
	setSelection: React.Dispatch<
		React.SetStateAction<{
			busPlate?: string | undefined;
			routeId?: string | undefined;
		}>
	>;
	selected: {
		busPlate?: string | undefined;
		routeId?: string | undefined;
	};
}

export default function BusSelector({setSelection, selected}: BusSelectorProps) {
	const router = useRouter();
	const [data, setData] = useState<Busses[] | null>(null);

	useEffect(() => {
		const fetchBusses = async () => {
			const res = await fetch('/api/busses', {
				method: 'GET',
			});
			const data = await res.json();
			return data;
		};

		fetchBusses().then(data => setData(data));
	}, []);

	const fetchBusses = async () => {
		const res = await fetch('/api/busses', {
			method: 'GET',
		});
		const data = await res.json();
		return data;
	};

	const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelection((prev) => ({ ...prev, busPlate: event.target.value }));
	}

	return (
		<div className='h-full'>
			<div className='flex justify-between px-2'>
				<h1 className='text-xl font-bold my-4'>Autobuses disponibles</h1>
				<button
					onClick={() => router.push('/busses/create')}
					className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded h-max my-auto transition-all'
				>
					Agregar
				</button>
			</div>
			<BuildTable selectedPlate={selected.busPlate ?? ''} handleSelect={handleSelect} data={data} />
		</div>
	);
}
