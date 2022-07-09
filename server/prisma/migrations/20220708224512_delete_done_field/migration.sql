/*
  Warnings:

  - You are about to drop the column `done` on the `TodoItem` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TodoItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "text" TEXT NOT NULL
);
INSERT INTO "new_TodoItem" ("id", "text", "userId") SELECT "id", "text", "userId" FROM "TodoItem";
DROP TABLE "TodoItem";
ALTER TABLE "new_TodoItem" RENAME TO "TodoItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
