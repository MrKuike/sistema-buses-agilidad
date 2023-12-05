import prisma from '@/db';
import { Busses as BussesType } from '@prisma/client';

export default class Busses {
	static async getBus({ plate }: { plate: string }) {
		try {
			const data = await prisma.busses.findUnique({
				where: {
					plate,
				},
			});
			if (data) {
				return { status: 200, data };
			}
			return { status: 404, data: [] };
		} catch (error: any) {
			return { status: 500, message: error };
		}
	}

	static async getAllBusses() {
		try {
			const data = await prisma.busses.findMany();
			if (data) {
				return { status: 200, data };
			}
			return { status: 404, data: [] };
		} catch (error: any) {
			return { status: 500, message: error };
		}
	}

	static async createBus(data: BussesType) {
		try {
			const result: BussesType = await prisma.busses.create({
				data,
			});
			if (result) {
				return { status: 200, message: 'Bus created successfully' };
			}
			return { status: 404, message: 'Bus not created' };
		} catch (error: any) {
			return { status: 500, message: error };
		}
	}

	// static async createManyBusses(
	//   data: {
	//     color: string;
	//     brand: string;
	//     model: string;
	//     plate: string;
	//     seats: number;
	//   }[]
	// ) {
	//   try {
	//     const result = await prisma.busses.create({
	//       data,
	//     });
	//     if (result) {
	//       return { status: 200, message: "Busses created successfully" };
	//     }
	//     return { status: 500, message: "Busses not created" };
	//   } catch (error: any) {
	//     return { status: 400, message: error };
	//   }
	// }

	static async deleteBus(plate: string	) {
		try {
			const result = await prisma.busses.delete({
				where: { plate },
			});
			if (result) {
				return { status: 200, message: 'Bus deleted successfully' };
			}
			return { status: 404, message: 'Bus not deleted' };
		} catch (error: any) {
			return { status: 500, message: error };
		}
	}
}
