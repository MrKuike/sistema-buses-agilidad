/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Roads` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_InterestsPoints" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "street" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "roadID" INTEGER NOT NULL,
    CONSTRAINT "InterestsPoints_roadID_fkey" FOREIGN KEY ("roadID") REFERENCES "Roads" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_InterestsPoints" ("createdAt", "id", "order", "roadID", "street", "updatedAt") SELECT "createdAt", "id", "order", "roadID", "street", "updatedAt" FROM "InterestsPoints";
DROP TABLE "InterestsPoints";
ALTER TABLE "new_InterestsPoints" RENAME TO "InterestsPoints";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Roads_name_key" ON "Roads"("name");
