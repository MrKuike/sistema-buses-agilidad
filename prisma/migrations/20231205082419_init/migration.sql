-- CreateTable
CREATE TABLE "Busses" (
    "color" TEXT NOT NULL PRIMARY KEY,
    "plate" TEXT NOT NULL,
    "seats" INTEGER NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "driverID" INTEGER,
    "roadID" INTEGER,
    CONSTRAINT "Busses_driverID_fkey" FOREIGN KEY ("driverID") REFERENCES "Drivers" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Busses_roadID_fkey" FOREIGN KEY ("roadID") REFERENCES "Roads" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Drivers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "run" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "licenceExpiration" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Roads" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "time" DATETIME NOT NULL,
    "mapUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "InterestsPoints" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "street" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "roadID" INTEGER,
    CONSTRAINT "InterestsPoints_roadID_fkey" FOREIGN KEY ("roadID") REFERENCES "Roads" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Busses_plate_key" ON "Busses"("plate");

-- CreateIndex
CREATE UNIQUE INDEX "Drivers_run_key" ON "Drivers"("run");
