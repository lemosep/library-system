/*
  Warnings:

  - You are about to drop the column `token` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "token";

-- CreateTable
CREATE TABLE "sessions" (
    "sessionID" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "expiresIn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("sessionID")
);
