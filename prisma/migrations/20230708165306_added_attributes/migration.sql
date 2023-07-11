/*
  Warnings:

  - You are about to alter the column `name` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(130)`.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `year` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "books" ADD COLUMN     "publisher" TEXT,
ADD COLUMN     "year" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "username" VARCHAR(30) NOT NULL,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(130);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
