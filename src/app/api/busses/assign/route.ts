import prisma from "@/db";

type AssignBus = {
	data: {
		busPlate: string;
		routeId: string;
	};
};
export async function POST(req: Request) {
	const { data }: AssignBus = await req.json();
	console.log(data);

  const query = await prisma.busses.update({
    where: {
      plate: data.busPlate
    },
    data: {
      Roads: {
        connect: {
            id: +data.routeId
        }
      }
    }
  })

  console.log(query)

	return new Response(JSON.stringify({ message: 'Asignación exitosa!' }), { status: 200 });
}

// export async function GET() {
//   const res = await prisma.roads.create({
//     data: {
//       name: "Ruta 1",
//       mapUrl: 'https://maps.openrouteservice.org/#/directions/Santiago%20Arata%20Gandolfo,Arica,TP,Chile/La%20Bastilla,Arica,TP,Chile/Universidad%20de%20Tarapaca,Arica,TP,Chile/data/55,130,32,198,15,97,4,224,38,9,96,59,2,24,5,192,166,6,113,0,184,64,90,1,216,0,96,14,128,38,1,56,1,100,60,242,6,96,17,128,14,0,217,172,161,128,105,245,116,234,12,91,22,38,216,161,22,172,2,178,87,37,32,55,17,50,84,59,145,110,88,131,41,234,38,247,237,90,148,185,228,233,87,101,51,98,146,20,105,74,152,79,75,1,45,133,72,98,27,136,8,0,29,83,192,136,141,131,138,0,5,229,0,11,107,132,198,201,237,237,1,0,6,111,0,3,110,139,130,11,13,15,0,6,228,128,14,111,128,1,103,157,145,226,7,30,128,158,141,14,136,134,6,151,137,136,83,1,137,138,134,83,231,224,20,26,7,24,146,158,128,15,173,236,141,12,142,19,210,3,86,213,150,5,216,27,138,10,152,135,154,136,85,18,34,41,232,92,130,30,22,139,128,156,140,153,142,128,11,225,113,116,0,0/embed/es-es',
//       time: "2023-12-05T06:54:36-11:00",
//     }
//   })

//   console.log(res)
//   return new Response(JSON.stringify({ message: 'Hello' }), { status: 200 });
// }