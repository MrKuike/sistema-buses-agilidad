import prisma from '@/db';
import { InterestsPoints, MapPointsCoord, Roads as RoadsType } from '@prisma/client';

export default class Roads {
	static async getRoadsById({ id }: { id: number }) {
		try {
			const result = await prisma.roads.findUnique({
				where: {
					id,
				},
				include: {
					InterestsPoints: {
						orderBy: { order: 'asc' },
					},
					MapPointsCoord: true,
				},
			});
			if (result) {				
				return { status: 200, result };
			}
			return { status: 404, message: 'Road not found' };
		} catch (error: any) {
			return { status: 500, message: error };
		}
	}

	static async getAllRoads() {
		try {
			const result = await prisma.roads.findMany({include: {InterestsPoints: {orderBy: {order: 'asc'}}, MapPointsCoord: true}});
			if (result) {
				return { status: 200, result };
			}
			return { status: 404, message: 'No roads found' };
		} catch (error: any) {
			return { status: 500, message: error };
		}
	}

	static async createRoad(
		data: RoadsType,
		interestsPoints: InterestsPoints[],
		coordsPoints: MapPointsCoord[],
	) {
		try {			
			const result = await prisma.roads.create({
				data,
			});						

			if (result) {
				if (interestsPoints) {					
					await Promise.all(
						interestsPoints.map(async interestPoint => {
							await prisma.interestsPoints.create({
								data: {
									...interestPoint,
									roadID: result.id,
								},
							});
						}),
					);
				}
				
				if (coordsPoints) {					
					await Promise.all(
						coordsPoints.map(async coordPoint => {
							await prisma.mapPointsCoord.create({
								data: {
									...coordPoint,
									roadID: result.id,
								},
							});
						}),
					);
				}
				return { status: 200, message: 'Road created successfully' };
			}
			return { status: 404, message: 'Error creating road' };
		} catch (error: any) {
			return { status: 500, message: error };
		}
	}
}
