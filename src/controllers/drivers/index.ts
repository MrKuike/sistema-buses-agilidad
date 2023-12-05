import prisma from "@/db";
import { Drivers as DriversType } from "@prisma/client";

export default class Drivers {
  static async getDriver({ id }: { id: number }) {
    try {
      const data = await prisma.drivers.findUnique({
        where: {
          id,
        },
      });
      if (data) {
        return { status: 200, data };
      }
      return { status: 404, message: 'Driver not found' };
    } catch (error: any) {
      return { status: 500, message: error };
    }
  }

  static async getAllDrivers() {
    try {
      const data = await prisma.drivers.findMany();      
      if (data) {
        return { status: 200, data };
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
