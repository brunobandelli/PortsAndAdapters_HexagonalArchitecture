/*
  Warnings:

  - The primary key for the `Client` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Client` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `clientId` on the `Telephone` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT
);
INSERT INTO "new_Client" ("email", "id", "name", "password") SELECT "email", "id", "name", "password" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");
CREATE TABLE "new_Telephone" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "clientId" INTEGER NOT NULL,
    CONSTRAINT "Telephone_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Telephone" ("clientId", "id", "number", "type") SELECT "clientId", "id", "number", "type" FROM "Telephone";
DROP TABLE "Telephone";
ALTER TABLE "new_Telephone" RENAME TO "Telephone";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
