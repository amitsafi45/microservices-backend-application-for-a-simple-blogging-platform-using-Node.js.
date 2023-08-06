/*
  Warnings:

  - You are about to drop the column `createdAt` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `token` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `token` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `token` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "media" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3),
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "profile" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3),
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "token" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3),
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "user" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3),
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3);
