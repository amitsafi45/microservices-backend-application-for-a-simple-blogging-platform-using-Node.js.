/*
  Warnings:

  - The `expiresAt` column on the `token` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "token" DROP COLUMN "expiresAt",
ADD COLUMN     "expiresAt" TIMESTAMPTZ(3);
