/*
  Warnings:

  - You are about to drop the column `profile_id` on the `media` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "media_profile_id_key";

-- AlterTable
ALTER TABLE "media" DROP COLUMN "profile_id";
