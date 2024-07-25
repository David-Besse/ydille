/*
  Warnings:

  - You are about to drop the column `image` on the `Gallery` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `Gallery` table. All the data in the column will be lost.
  - Added the required column `alt` to the `Gallery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Gallery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gallery" DROP COLUMN "image",
DROP COLUMN "order",
ADD COLUMN     "alt" VARCHAR(255) NOT NULL,
ADD COLUMN     "name" VARCHAR(255) NOT NULL;
