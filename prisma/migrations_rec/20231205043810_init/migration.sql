-- SQLBook: Code
-- CreateTable
CREATE TABLE "Busses" (
    "color" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "driverID" INTEGER,
    "routeID" INTEGER,

    CONSTRAINT "Busses_pkey" PRIMARY KEY ("color")
);

-- CreateTable
CREATE TABLE "Drivers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Routes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Routes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Busses" ADD CONSTRAINT "Busses_driverID_fkey" FOREIGN KEY ("driverID") REFERENCES "Drivers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Busses" ADD CONSTRAINT "Busses_routeID_fkey" FOREIGN KEY ("routeID") REFERENCES "Routes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
