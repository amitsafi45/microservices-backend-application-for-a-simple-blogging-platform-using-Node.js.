/*
  Warnings:

  - You are about to drop the column `madia_id` on the `profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[profile_id]` on the table `media` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profile_id` to the `media` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_madia_id_fkey";

-- DropIndex
DROP INDEX "profile_madia_id_key";

-- AlterTable
ALTER TABLE "media" ADD COLUMN     "profile_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "profile" DROP COLUMN "madia_id";

-- CreateIndex
CREATE UNIQUE INDEX "media_profile_id_key" ON "media"("profile_id");

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
