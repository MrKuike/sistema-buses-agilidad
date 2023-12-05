import { Drivers } from '@/controllers';
import { Drivers as DriversType } from '@prisma/client';

type Req = {
	data: DriversType;
};

type ResPOST = {
	status: number;
	message: string;
};

type ResGET = {
	status: number;
	data?: DriversType[];
	message?: string;
};

export async function GET() {
	const { status, message, data }: ResGET = await Drivers.getAllDrivers();
	if (status === 500)
		return new Response(JSON.stringify({ message }), { status });
	return new Response(JSON.stringify(data), { status });
}

export async function POST(req: Request) {
	const { data }: Req = await req.json();

	if (!data) return new Response('Missing information', { status: 400 });

	const { status, message }: ResPOST = await Drivers.createDriver(data);
	return new Response(
		JSON.stringify({
			message,
		}),
		{ status },
	);
}
