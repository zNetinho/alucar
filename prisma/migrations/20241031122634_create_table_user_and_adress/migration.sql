-- CreateEnum
CREATE TYPE "StausUser" AS ENUM ('ACTIVE', 'DESACTIVE', 'DEFAULTER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "adress_id" TEXT,
    "cpf" TEXT NOT NULL,
    "status" "StausUser" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adress" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "adress" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "cep" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "reference" TEXT NOT NULL,

    CONSTRAINT "Adress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Adress_user_id_key" ON "Adress"("user_id");

-- AddForeignKey
ALTER TABLE "Adress" ADD CONSTRAINT "Adress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
