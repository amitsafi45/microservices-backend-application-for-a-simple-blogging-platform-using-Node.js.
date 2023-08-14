/*
  Warnings:

  - Added the required column `user_id` to the `CommentLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `post_like` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CommentLike" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "post_like" ADD COLUMN     "user_id" TEXT NOT NULL;
