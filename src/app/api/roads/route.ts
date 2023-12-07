import { Roads } from '@/controllers';
import { InterestsPoints, MapPointsCoord, Roads as RoadsType } from '@prisma/client';

type Req = {
	data: RoadsType;
	interestsPoints: InterestsPoints[];
	coordsPoints: MapPointsCoord[];
};

type ResPOST = {
	status: number;
	message: string;
};

export async function GET() {
	const { status, message, result } = await Roads.getAllRoads();
	if (status === 500)
		return new Response(JSON.stringify({ message }), { status });
	return new Response(JSON.stringify(result), { status });
}

export async function POST(req: Request) {
	const { data, interestsPoints, coordsPoints }: Req = await req.json();
	
	if (!data || !interestsPoints || !coordsPoints) return new Response('Missing information', { status: 400 });

	const { status, message }: ResPOST = await Roads.createRoad(data, interestsPoints, coordsPoints);
	return new Response(
		JSON.stringify({
			message,
		}),
		{ status },
	);
}
