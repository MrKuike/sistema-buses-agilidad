-- SQLBook: Code
/*
  Warnings:

  - You are about to drop the column `routeID` on the `Busses` table. All the data in the column will be lost.
  - You are about to drop the column `routeID` on the `InterestsPoints` table. All the data in the column will be lost.
  - You are about to drop the `Routes` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[plate]` on the table `Busses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[run]` on the table `Drivers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `brand` to the `Busses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `Busses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plate` to the `Busses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seats` to the `Busses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `licenceExpiration` to the `Drivers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `run` to the `Drivers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Busses" DROP CONSTRAINT "Busses_routeID_fkey";

-- DropForeignKey
ALTER TABLE "InterestsPoints" DROP CONSTRAINT "InterestsPoints_routeID_fkey";

-- AlterTable
ALTER TABLE "Busses" DROP COLUMN "routeID",
ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "model" TEXT NOT NULL,
ADD COLUMN     "plate" TEXT NOT NULL,
ADD COLUMN     "roadID" INTEGER,
ADD COLUMN     "seats" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Drivers" ADD COLUMN     "licenceExpiration" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "run" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "InterestsPoints" DROP COLUMN "routeID",
ADD COLUMN     "roadID" INTEGER;

-- DropTable
DROP TABLE "Routes";

-- CreateTable
CREATE TABLE "Roads" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "mapUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Roads_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Busses_plate_key" ON "Busses"("plate");

-- CreateIndex
CREATE UNIQUE INDEX "Drivers_run_key" ON "Drivers"("run");

-- AddForeignKey
ALTER TABLE "Busses" ADD CONSTRAINT "Busses_roadID_fkey" FOREIGN KEY ("roadID") REFERENCES "Roads"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterestsPoints" ADD CONSTRAINT "InterestsPoints_roadID_fkey" FOREIGN KEY ("roadID") REFERENCES "Roads"("id") ON DELETE SET NULL ON UPDATE CASCADE;
