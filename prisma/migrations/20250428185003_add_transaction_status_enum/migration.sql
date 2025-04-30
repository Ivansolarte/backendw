/*
  Warnings:

  - You are about to drop the column `transactionNumber` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `customerAddress` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerName` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "transactionNumber",
ADD COLUMN     "customerAddress" TEXT NOT NULL,
ADD COLUMN     "customerName" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "TransactionStatus" NOT NULL;
