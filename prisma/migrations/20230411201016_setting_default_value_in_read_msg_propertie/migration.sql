-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_messages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "header" TEXT NOT NULL,
    "block" TEXT NOT NULL,
    "template" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "position" DATETIME NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_messages" ("block", "created_at", "header", "id", "position", "read", "template") SELECT "block", "created_at", "header", "id", "position", "read", "template" FROM "messages";
DROP TABLE "messages";
ALTER TABLE "new_messages" RENAME TO "messages";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
