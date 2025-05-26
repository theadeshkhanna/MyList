-- CreateTable
CREATE TABLE "episodes" (
    "id" TEXT NOT NULL,
    "episodeNumber" INTEGER NOT NULL,
    "seasonNumber" INTEGER NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "director" TEXT NOT NULL,
    "actors" TEXT[],
    "tvShowId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "episodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tv_shows" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tv_shows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movies" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contents" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "genres" "genre"[],
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "director" TEXT NOT NULL,
    "actors" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "watch_histories" (
    "id" TEXT NOT NULL,
    "watchedOn" TIMESTAMP(3) NOT NULL,
    "rating" INTEGER,
    "userId" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "watch_histories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tv_shows_contentId_key" ON "tv_shows"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "movies_contentId_key" ON "movies"("contentId");

-- AddForeignKey
ALTER TABLE "episodes" ADD CONSTRAINT "episodes_tvShowId_fkey" FOREIGN KEY ("tvShowId") REFERENCES "tv_shows"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tv_shows" ADD CONSTRAINT "tv_shows_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "contents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "contents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watch_histories" ADD CONSTRAINT "watch_histories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watch_histories" ADD CONSTRAINT "watch_histories_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "contents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
