/*
  Warnings:

  - You are about to drop the column `preferenceId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `preferances` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `preferances` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_preferenceId_fkey";

-- DropIndex
DROP INDEX "users_preferenceId_key";

-- AlterTable
ALTER TABLE "preferances" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "preferenceId";

-- CreateIndex
CREATE UNIQUE INDEX "preferances_userId_key" ON "preferances"("userId");

-- AddForeignKey
ALTER TABLE "preferances" ADD CONSTRAINT "preferances_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
