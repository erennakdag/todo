-- CreateTable
CREATE TABLE "TodoItem" (
    "userId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TodoItem_userId_key" ON "TodoItem"("userId");
