/*
  Warnings:

  - A unique constraint covering the columns `[preferenceId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `preferenceId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "genre" AS ENUM ('action', 'comedy', 'drama', 'fantasy', 'horror', 'romance', 'scifi');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "preferenceId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "preferances" (
    "id" TEXT NOT NULL,
    "favoriteGenres" "genre"[],
    "dislikedGenres" "genre"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "preferances_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_preferenceId_key" ON "users"("preferenceId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_preferenceId_fkey" FOREIGN KEY ("preferenceId") REFERENCES "preferances"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
