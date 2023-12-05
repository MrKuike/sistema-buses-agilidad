import { Busses } from '@/controllers';

import { Busses as BussesType } from '@prisma/client';

type Req = {
	data: BussesType;
	// | BussesType[]
};

type ResPOST = {
	status: number;
	message: string;
};

type ResGET = {
	status: number;
	data?: BussesType[];
	message?: string;
};

export async function GET() {
	const { status, data, message }: ResGET = await Busses.getAllBusses();
	if (status === 500)
		return new Response(JSON.stringify({ message }), { status });
	return new Response(JSON.stringify(data), { status });
}

export async function POST(req: Request) {
	const { data }: Req = await req.json();
	console.log(data, 'start');
	if (!data)
		return new Response(JSON.stringify({ message: 'Missing information' }), {
			status: 400,
		});

	const { status, message }: ResPOST = await Busses.createBus(data);

	return new Response(
		JSON.stringify({
			message,
		}),
		{ status },
	);
}

export async function DELETE(req: Request) {
	const { plate } = await req.json();

	console.log(plate, 'start');
	if (!plate)
		return new Response(JSON.stringify({ message: 'Missing information' }), {
			status: 400,
		});

	const { status, message }: ResPOST = await Busses.deleteBus(plate);
	console.log(status, message, 'end');

	return new Response(
		JSON.stringify({
			message,
		}),
		{ status },
	);
}
