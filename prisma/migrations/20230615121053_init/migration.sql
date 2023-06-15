-- CreateTable
CREATE TABLE "Url" (
    "id" SERIAL NOT NULL,
    "urlId" TEXT NOT NULL,
    "longUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_urlId_key" ON "Url"("urlId");
