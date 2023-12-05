import { Roads } from '@/controllers';
import { Roads as RoadsType } from '@prisma/client';

type Req = {
	data: RoadsType;
};

type ResPOST = {
	status: number;
	message: string;
};

type ResGET = {
	status: number;
	data?: RoadsType[];
	message?: string;
};

export async function GET() {
	const { status, message, data }: ResGET = await Roads.getAllRoads();
	if (status === 500)
		return new Response(JSON.stringify({ message }), { status });
	return new Response(JSON.stringify(data), { status });
}

export async function POST(req: Request) {
	const { data }: Req = await req.json();

	if (!data) return new Response('Missing information', { status: 400 });

	const { status, message }: ResPOST = await Roads.createRoad(data);
	return new Response(
		JSON.stringify({
			message,
		}),
		{ status },
	);
}
