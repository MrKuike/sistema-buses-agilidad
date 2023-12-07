/*
  Warnings:

  - You are about to drop the column `mapUrl` on the `Roads` table. All the data in the column will be lost.
  - Added the required column `mapGeometry` to the `Roads` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Roads" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "time" DATETIME NOT NULL,
    "mapGeometry" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Roads" ("createdAt", "id", "name", "time", "updatedAt") SELECT "createdAt", "id", "name", "time", "updatedAt" FROM "Roads";
DROP TABLE "Roads";
ALTER TABLE "new_Roads" RENAME TO "Roads";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
