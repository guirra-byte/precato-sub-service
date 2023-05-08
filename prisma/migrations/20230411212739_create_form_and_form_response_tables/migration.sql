-- CreateTable
CREATE TABLE "Form" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "formUrl" TEXT NOT NULL,
    "qrCode" TEXT NOT NULL,
    "block" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FormResponse" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sub_id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "answers" TEXT NOT NULL,
    "formId" TEXT,
    CONSTRAINT "FormResponse_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Form_formUrl_key" ON "Form"("formUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Form_qrCode_key" ON "Form"("qrCode");
