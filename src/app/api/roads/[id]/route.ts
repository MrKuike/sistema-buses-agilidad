import Roads from "@/controllers/roads";

export async function GET(req: Request, {params}: {params: {id: string}}) {
	const id = parseInt(params.id);	

	const { status, result } = await Roads.getRoadsById({ id });
	
	return new Response(
		JSON.stringify({
			result,
		}),
		{ status },
	);
}
