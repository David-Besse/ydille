-- CreateTable
CREATE TABLE "Gallery" (
    "id" TEXT NOT NULL,
    "image" VARCHAR(255) NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("id")
);
