-- CreateEnum
CREATE TYPE "Status" AS ENUM ('READ', 'READING', 'INSHELF');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "book" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "author" TEXT,
    "pages" INTEGER NOT NULL,

    CONSTRAINT "book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Book" (
    "userId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "progress" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'INSHELF',
    "review" TEXT,

    CONSTRAINT "User_Book_pkey" PRIMARY KEY ("userId","bookId")
);

-- AddForeignKey
ALTER TABLE "User_Book" ADD CONSTRAINT "User_Book_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Book" ADD CONSTRAINT "User_Book_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
