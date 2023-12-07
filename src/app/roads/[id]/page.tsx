// import { MapComponent } from '@/components/map';
import db from '@/db';
import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('@/components/map'), {
	ssr: false,
});

const getRoadById = async (id: number) => {
	const data = await db.roads.findUnique({
		where: { id },
		include: {
			InterestsPoints: {
				orderBy: { order: 'asc' },
			},
			MapPointsCoord: true,
		},
	});
	return data;
};

interface PageProps {
	params: {
		id: number;
	};
}
export default async function Page({ params }: PageProps) {
	const { id } = params;

	const road = await getRoadById(+id);

	if (!road) {
		redirect('/roads');
	}

	const markerCoords: [number, number][] = road.MapPointsCoord.map(point => [
		point.latitude,
		point.longitude,
	]);

	return (
		<>
			<h3>{road.name}</h3>
			<MapComponent
				geometry={road.mapGeometry}
				markerCoords={markerCoords}
			/>
		</>
	);
}
