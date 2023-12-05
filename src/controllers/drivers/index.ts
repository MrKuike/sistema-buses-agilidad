import prisma from "@/db";
import { Drivers as DriversType } from "@prisma/client";

export default class Drivers {
  static async getDriver({ id }: { id: number }) {
    try {
      const result = await prisma.drivers.findUnique({
        where: {
          id,
        },
      });
      if (result) {
        return { status: 200, result };
      }
      return { status: 404, message: 'Driver not found' };
    } catch (error: any) {
      return { status: 500, message: error };
    }
  }

  static async getAllDrivers() {
    try {
      const result = await prisma.drivers.findMany();
      if (result) {
        return { status: 200, result };
      }
      return { status: 404, message: 'Drivers not found' };
    } catch (error: any) {
      return { status: 500, message: error };
    }
  }

  static async createDriver(data: DriversType) {
    try {
      const result = await prisma.drivers.create({
        data,
      });
      if (result) {
        return { status: 200, message: "Driver created successfully" };
      }
      return { status: 404, message: 'Error creating driver' };
    } catch (error: any) {
      return { status: 500, message: error };
    }
  }
}
