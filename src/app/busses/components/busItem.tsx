import { useBusSelection } from '@/app/store/busSelection';
import { Busses } from '@/types';
import Image from 'next/image';

interface BusItemProps {
	bus: Busses;
}
export default function BusItem({ bus }: BusItemProps) {
	const { brand, color } = bus;
	const { setBusSelection, reset, busPlate } = useBusSelection();

	const handleClick = () => {
		if(busPlate === bus.plate){
			return reset();
		}

		setBusSelection({
			busPlate: bus.plate,
			driverId: bus.driverID,
			routeId: Number(bus.roadID),
		});
	};

	return (
		<button
			type='button'
			onClick={handleClick}
			className={`grid grid-rows-2 grid-cols-2 items-center h-36 w-full border rounded duration-100 p-2 ${
				busPlate === bus.plate ? 'border-blue-600' : 'hover:border-slate-600 '
			}`}
		>
			<picture className='h-full flex justify-center'>
				<Image
					className='h-full object-scale-down self-end'
					src={`/images/${color}.webp`}
					width={50}
					height={50}
					alt='busesito'
				/>
			</picture>
			<div className='border h-full grid items-center'>
				<h2 className='text-lg text-center font-semibold'>{bus.plate}</h2>
			</div>
			<div className='items-center col-span-2 gap-4 text-slate-400'>
				<h2 className='text-lg text-center font-semibold text-slate-700'>
					{brand}
				</h2>
				<span className='text-sm text-center block'>
					{bus.driverID ? `Conductor ${bus.driverID}` : 'Sin conductor'}
				</span>
				<span className='text-sm text-center block'>
					{bus.roadID ? `Ruta ${bus.roadID}` : 'Sin ruta'}
				</span>
			</div>
		</button>
	);
}
