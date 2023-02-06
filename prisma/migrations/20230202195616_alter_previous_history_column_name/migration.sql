/*
  Warnings:

  - You are about to drop the column `previous_histor` on the `subs` table. All the data in the column will be lost.
  - Added the required column `previous_history` to the `subs` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_subs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "block" TEXT NOT NULL,
    "history" TEXT NOT NULL,
    "previous_history" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "las_message" TEXT
);
INSERT INTO "new_subs" ("active", "block", "created_at", "email", "history", "id", "las_message", "name") SELECT "active", "block", "created_at", "email", "history", "id", "las_message", "name" FROM "subs";
DROP TABLE "subs";
ALTER TABLE "new_subs" RENAME TO "subs";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
