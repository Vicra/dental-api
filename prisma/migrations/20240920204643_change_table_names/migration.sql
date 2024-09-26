/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Appointment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Medication` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Patient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Prescription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PrescriptionItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Appointment` DROP FOREIGN KEY `Appointment_doctorId_fkey`;

-- DropForeignKey
ALTER TABLE `Appointment` DROP FOREIGN KEY `Appointment_locationId_fkey`;

-- DropForeignKey
ALTER TABLE `Appointment` DROP FOREIGN KEY `Appointment_patientId_fkey`;

-- DropForeignKey
ALTER TABLE `Appointment` DROP FOREIGN KEY `Appointment_prescriptionId_fkey`;

-- DropForeignKey
ALTER TABLE `Location` DROP FOREIGN KEY `Location_addressId_fkey`;

-- DropForeignKey
ALTER TABLE `Patient` DROP FOREIGN KEY `Patient_addressId_fkey`;

-- DropForeignKey
ALTER TABLE `PrescriptionItem` DROP FOREIGN KEY `PrescriptionItem_medicationId_fkey`;

-- DropForeignKey
ALTER TABLE `PrescriptionItem` DROP FOREIGN KEY `PrescriptionItem_prescriptionId_fkey`;

-- DropTable
DROP TABLE `Address`;

-- DropTable
DROP TABLE `Appointment`;

-- DropTable
DROP TABLE `Location`;

-- DropTable
DROP TABLE `Medication`;

-- DropTable
DROP TABLE `Patient`;

-- DropTable
DROP TABLE `Prescription`;

-- DropTable
DROP TABLE `PrescriptionItem`;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `addresses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `street` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `sex` ENUM('MALE', 'FEMALE') NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `dob` DATETIME(3) NOT NULL,
    `addressId` INTEGER NOT NULL,

    UNIQUE INDEX `patients_email_key`(`email`),
    UNIQUE INDEX `patients_addressId_key`(`addressId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `appointments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patientId` INTEGER NOT NULL,
    `doctorId` VARCHAR(191) NOT NULL,
    `dateTime` DATETIME(3) NOT NULL,
    `locationId` INTEGER NOT NULL,
    `prescriptionId` INTEGER NULL,

    UNIQUE INDEX `appointments_prescriptionId_key`(`prescriptionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `precriptions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `patientAge` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `precription_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `medicationId` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,
    `dose` VARCHAR(191) NOT NULL,
    `observation` VARCHAR(191) NOT NULL,
    `prescriptionId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `locations` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `addressId` INTEGER NOT NULL,

    UNIQUE INDEX `locations_addressId_key`(`addressId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sku` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'DOCTOR', 'SECRETARY') NOT NULL DEFAULT 'DOCTOR',
    `specialty` ENUM('ANESTHESIOLOGY', 'CARDIOLOGY', 'DENTIST', 'DERMATOLOGY', 'FORENSIC', 'GYNECOLOGY', 'IMMUNOLOGY', 'INTERNAL', 'NEUROLOGY', 'OPHTALMIC', 'ORTHOPAEDIC', 'OTOLARYNGOLOGY', 'PATHOLOGY', 'PEDIATRIC', 'PLASTIC', 'PSYCHIATRY', 'PSYCOLOGY', 'RADIOLOGY', 'REHABILITATION', 'RHEUMATHOLOGY', 'UROLOGY') NOT NULL DEFAULT 'DENTIST',

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `patients` ADD CONSTRAINT `patients_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `addresses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patients`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `locations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_prescriptionId_fkey` FOREIGN KEY (`prescriptionId`) REFERENCES `precriptions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `precription_items` ADD CONSTRAINT `precription_items_medicationId_fkey` FOREIGN KEY (`medicationId`) REFERENCES `medications`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `precription_items` ADD CONSTRAINT `precription_items_prescriptionId_fkey` FOREIGN KEY (`prescriptionId`) REFERENCES `precriptions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `locations` ADD CONSTRAINT `locations_addressId_fkey` FOREIGN KEY (`addressId`) REFERENCES `addresses`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
