import { Driver } from '@/types';
import Image from 'next/image';
import Loading from './loading';

interface DriversListProps {
	drivers: Driver[] | null;
}
export default function DriversList(props: DriversListProps) {
	const { drivers } = props;

	if (!drivers) {
		return (
			<div className=' bg-slate-100 rounded-lg p-2 h-10'>
				<Loading />;
			</div>
		);
	}
	return (
		<ul className='grid grid-cols-3 md:grid-cols-5 bg-slate-100 rounded-lg p-2'>
			{drivers.map(driver => (
				<li
					key={driver.id}
					className='flex flex-wrap flex-col items-center justify-center rounded-xl p-1 hover:bg-slate-200'
				>
					<Image
						src={`/images/generic_driver.png`}
						alt={'Generic Driver Photo'}
						width={50}
						height={50}
					/>
					<span className='text-center'>{driver.name}</span>
				</li>
			))}
		</ul>
	);
}
