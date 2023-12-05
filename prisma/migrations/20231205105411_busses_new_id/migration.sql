/*
  Warnings:

  - The primary key for the `Busses` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Busses" (
    "color" TEXT NOT NULL,
    "plate" TEXT NOT NULL PRIMARY KEY,
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
INSERT INTO "new_Busses" ("brand", "color", "createdAt", "driverID", "model", "plate", "roadID", "seats", "updatedAt") SELECT "brand", "color", "createdAt", "driverID", "model", "plate", "roadID", "seats", "updatedAt" FROM "Busses";
DROP TABLE "Busses";
ALTER TABLE "new_Busses" RENAME TO "Busses";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
