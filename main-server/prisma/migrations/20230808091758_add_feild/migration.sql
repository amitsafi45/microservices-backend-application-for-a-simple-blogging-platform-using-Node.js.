-- CreateTable
CREATE TABLE "service_registry" (
    "id" TEXT NOT NULL,
    "client_name" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "service_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "service_registry_pkey" PRIMARY KEY ("id")
);
