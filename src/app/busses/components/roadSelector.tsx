'use client';

import { useBusSelection } from '@/app/store/busSelection';
import { RoadsResponse } from '@/types';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

interface RoadSelectorProps {}

const MapComponent = dynamic(() => import('@/components/map'), {
	ssr: false,
});

export default function RoadSelector(props: RoadSelectorProps) {
	const { routeId, setRouteId } = useBusSelection();
	const [roads, setRoads] = useState<RoadsResponse[]>([]);
	const [selectedRoad, setSelectedRoad] = useState<RoadsResponse | undefined>();

	const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const road = roads.find(road => road.id === +event.target.value);
		if (!road) return;
		setRouteId(road.id);
	};

	useEffect(() => {
		fetch('/api/roads', {
			method: 'GET',
		}).then(r => {
			if (r.status === 200) {
				r.json().then((data: RoadsResponse[]) => {
					setRoads(data);
					if (routeId) {
						const road = data.find(road => road.id === routeId);
						if (road) {
							setSelectedRoad(road);
						}
					}
				});
			}
		});
	}, [routeId]);

	return (
		<div className='flex flex-col h-full'>
			<div className='flex-1'>
				<h1 className='text-xl font-bold my-4 pl-2'>Seleccione una ruta</h1>
				<div className='flex gap-4 p-2'>
					<label
						className='whitespace-nowrap text-lg'
						htmlFor='roadSelector'
					>
						Ruta elegida:
					</label>
					<select
						value={selectedRoad?.id}
						className='flex-1 text-lg border border-black rounded text-center'
						id='roadSelector'
						onChange={handleSelect}
					>
						<option value=''>Seleccione una ruta</option>
						{roads.map(road => (
							<option
								key={road.id}
								value={road.id}
							>
								{road.name}
							</option>
						))}
					</select>
				</div>
			</div>
			{selectedRoad && (
				<div className='flex-[4] h-full w-full rounded'>
					<MapComponent
						geometry={selectedRoad.mapGeometry}
						markerCoords={selectedRoad.MapPointsCoord.map(
							({ longitude, latitude }) => [latitude, longitude],
						)}
					/>
				</div>
			)}
		</div>
	);
}
