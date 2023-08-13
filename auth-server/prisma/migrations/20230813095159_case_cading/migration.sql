-- DropForeignKey
ALTER TABLE "media" DROP CONSTRAINT "media_profile_id_fkey";

-- AddForeignKey
ALTER TABLE "media" ADD CONSTRAINT "media_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
