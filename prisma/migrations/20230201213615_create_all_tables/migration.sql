-- CreateTable
CREATE TABLE "subs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "block" TEXT NOT NULL,
    "history" TEXT NOT NULL,
    "previous_histor" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "las_message" TEXT
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "header" TEXT NOT NULL,
    "block" TEXT NOT NULL,
    "template" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "position" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "msgsOnSubs" (
    "sub_id" TEXT NOT NULL,
    "msg_id" TEXT NOT NULL,
    CONSTRAINT "msgsOnSubs_sub_id_fkey" FOREIGN KEY ("sub_id") REFERENCES "subs" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "msgsOnSubs_msg_id_fkey" FOREIGN KEY ("msg_id") REFERENCES "messages" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "msgsOnSubs_sub_id_msg_id_key" ON "msgsOnSubs"("sub_id", "msg_id");
