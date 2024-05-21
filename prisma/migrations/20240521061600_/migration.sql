-- CreateTable
CREATE TABLE `pages` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `meta_title` VARCHAR(191) NOT NULL,
    `meta_description` VARCHAR(191) NULL,

    UNIQUE INDEX `pages_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `posts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `post_content` VARCHAR(191) NULL,
    `parent_slug` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `posts` ADD CONSTRAINT `posts_parent_slug_fkey` FOREIGN KEY (`parent_slug`) REFERENCES `pages`(`slug`) ON DELETE RESTRICT ON UPDATE CASCADE;
