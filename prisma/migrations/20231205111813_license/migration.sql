/*
  Warnings:

  - You are about to drop the column `licenceExpiration` on the `Drivers` table. All the data in the column will be lost.
  - Added the required column `licenseExpiration` to the `Drivers` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Drivers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "run" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "licenseExpiration" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Drivers" ("createdAt", "id", "name", "run", "updatedAt") SELECT "createdAt", "id", "name", "run", "updatedAt" FROM "Drivers";
DROP TABLE "Drivers";
ALTER TABLE "new_Drivers" RENAME TO "Drivers";
CREATE UNIQUE INDEX "Drivers_run_key" ON "Drivers"("run");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
