/*
  Warnings:

  - Made the column `created_at` on table `profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `expiresAt` on table `token` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `token` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "token_user_id_key";

-- AlterTable
ALTER TABLE "profile" ALTER COLUMN "created_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "token" ALTER COLUMN "expiresAt" SET NOT NULL,
ALTER COLUMN "created_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "created_at" SET NOT NULL;
