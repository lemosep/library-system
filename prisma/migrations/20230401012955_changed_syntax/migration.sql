/*
  Warnings:

  - You are about to drop the `User_Book` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `book` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `use  r` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User_Book" DROP CONSTRAINT "User_Book_bookId_fkey";

-- DropForeignKey
ALTER TABLE "User_Book" DROP CONSTRAINT "User_Book_userId_fkey";

-- DropTable
DROP TABLE "User_Book";

-- DropTable
DROP TABLE "book";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "author" TEXT,
    "pages" INTEGER NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "read_logs" (
    "userId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "progress" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'INSHELF',
    "review" TEXT,

    CONSTRAINT "read_logs_pkey" PRIMARY KEY ("userId","bookId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "read_logs" ADD CONSTRAINT "read_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "read_logs" ADD CONSTRAINT "read_logs_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
