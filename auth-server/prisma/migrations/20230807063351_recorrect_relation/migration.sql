/*
  Warnings:

  - A unique constraint covering the columns `[madia_id]` on the table `profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `madia_id` to the `profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "media" DROP CONSTRAINT "media_profile_id_fkey";

-- AlterTable
ALTER TABLE "profile" ADD COLUMN     "madia_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "profile_madia_id_key" ON "profile"("madia_id");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_madia_id_fkey" FOREIGN KEY ("madia_id") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
