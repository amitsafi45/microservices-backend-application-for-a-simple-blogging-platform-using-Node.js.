-- CreateEnum
CREATE TYPE "Status" AS ENUM ('LIVE', 'DIE');

-- CreateTable
CREATE TABLE "service_registry" (
    "id" TEXT NOT NULL,
    "client_name" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "service_name" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "service_registry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "service_registry_service_name_key" ON "service_registry"("service_name");
