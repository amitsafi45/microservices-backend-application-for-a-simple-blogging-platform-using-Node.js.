/*
  Warnings:

  - You are about to drop the `ServiceRegstry` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ServiceRegstry";

-- CreateTable
CREATE TABLE "service_registry" (
    "id" TEXT NOT NULL,
    "client_name" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "service_registry_pkey" PRIMARY KEY ("id")
);
