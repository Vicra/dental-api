-- DropForeignKey
ALTER TABLE `patients` DROP FOREIGN KEY `patients_addressId_fkey`;

-- AlterTable
ALTER TABLE `patients` MODIFY `dob` DATETIME(3) NULL,
    MODIFY `addressId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `patients` ADD CONSTRAINT `patients_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `addresses`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
