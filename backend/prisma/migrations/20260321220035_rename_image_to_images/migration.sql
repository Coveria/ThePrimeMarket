/*
  Warnings:

  - You are about to drop the column `image` on the `products` table. All the data in the column will be lost.
  - The `description` column on the `products` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `price` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "products" DROP COLUMN "image",
ADD COLUMN     "batteryType" TEXT,
ADD COLUMN     "button" TEXT,
ADD COLUMN     "color" TEXT,
ADD COLUMN     "connection" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "design" TEXT,
ADD COLUMN     "discount" DOUBLE PRECISION,
ADD COLUMN     "features" TEXT[],
ADD COLUMN     "images" TEXT[],
ADD COLUMN     "interface" TEXT[],
ADD COLUMN     "power" TEXT,
ADD COLUMN     "series" TEXT,
ADD COLUMN     "size" TEXT,
ADD COLUMN     "type" TEXT,
ADD COLUMN     "weight" TEXT,
DROP COLUMN "description",
ADD COLUMN     "description" TEXT[],
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;
