/*
  Warnings:

  - You are about to drop the `DishDishType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DishDishType" DROP CONSTRAINT "DishDishType_dishId_fkey";

-- DropForeignKey
ALTER TABLE "DishDishType" DROP CONSTRAINT "DishDishType_dishTypeId_fkey";

-- DropTable
DROP TABLE "DishDishType";

-- CreateTable
CREATE TABLE "DishDishTypeLink" (
    "id" TEXT NOT NULL,
    "dishId" TEXT NOT NULL,
    "dishTypeId" TEXT,

    CONSTRAINT "DishDishTypeLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DishDishTypeLink_dishId_key" ON "DishDishTypeLink"("dishId");

-- CreateIndex
CREATE UNIQUE INDEX "DishDishTypeLink_dishId_dishTypeId_key" ON "DishDishTypeLink"("dishId", "dishTypeId");

-- AddForeignKey
ALTER TABLE "DishDishTypeLink" ADD CONSTRAINT "DishDishTypeLink_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DishDishTypeLink" ADD CONSTRAINT "DishDishTypeLink_dishTypeId_fkey" FOREIGN KEY ("dishTypeId") REFERENCES "DishType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
