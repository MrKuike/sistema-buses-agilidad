-- CreateTable
CREATE TABLE "MapPointsCoord" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "roadID" INTEGER NOT NULL,
    CONSTRAINT "MapPointsCoord_roadID_fkey" FOREIGN KEY ("roadID") REFERENCES "Roads" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
