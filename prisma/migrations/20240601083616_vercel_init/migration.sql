-- CreateTable
CREATE TABLE "pages" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "meta_title" TEXT NOT NULL,
    "meta_description" TEXT,

    CONSTRAINT "pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" SERIAL NOT NULL,
    "post_content" TEXT,
    "parent_slug" TEXT NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pages_slug_key" ON "pages"("slug");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_parent_slug_fkey" FOREIGN KEY ("parent_slug") REFERENCES "pages"("slug") ON DELETE CASCADE ON UPDATE CASCADE;
