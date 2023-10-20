/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Film` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title,listId]` on the table `Film` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,filmId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_filmId_fkey";

-- DropIndex
DROP INDEX "Film_userId_key";

-- DropIndex
DROP INDEX "Vote_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Film_title_key" ON "Film"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Film_title_listId_key" ON "Film"("title", "listId");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_userId_filmId_key" ON "Vote"("userId", "filmId");

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film"("id") ON DELETE CASCADE ON UPDATE CASCADE;
