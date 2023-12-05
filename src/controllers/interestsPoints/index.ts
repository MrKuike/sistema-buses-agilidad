import prisma from '@/db';
import { InterestsPoints as InterestsPointsType } from '@prisma/client';

export default class InterestsPoints {
	static async getInterestsPoints(roadID: number) {
		try {
			const result = await prisma.interestsPoints.findMany({
				where: {
					roadID,
				},
			});
			if (result) {
				return { status: 200, result };
			}
			return { status: 404, message: 'Interests Points not found' };
		} catch (error) {
			return { status: 500, message: error };
		}
	}

	static async getAllInterestsPoints() {
		try {
			const result = await prisma.interestsPoints.findMany();
			if (result) {
				return { status: 200, result };
			}
			return { status: 404, message: 'Interests Points not found' };
		} catch (error) {
			return { status: 500, message: error };
		}
	}

	static async createInterestsPoints(roadID: number, data: InterestsPointsType) {
		try {
			const result = await prisma.interestsPoints.create({
				data,
			});
			if (result) {
				return { status: 200, message: 'Interests Points created' };
			}
			return { status: 404, message: 'Interests Points not created' };
		} catch (error) {
			return { status: 500, message: error };
		}
	}
}
