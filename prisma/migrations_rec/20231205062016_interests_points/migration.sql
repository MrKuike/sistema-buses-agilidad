/*
  Warnings:

  - Added the required column `mapUrl` to the `Routes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Routes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Routes" ADD COLUMN     "mapUrl" TEXT NOT NULL,
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "InterestsPoints" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "routeID" INTEGER,

    CONSTRAINT "InterestsPoints_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InterestsPoints" ADD CONSTRAINT "InterestsPoints_routeID_fkey" FOREIGN KEY ("routeID") REFERENCES "Routes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
