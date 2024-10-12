-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MODERATOR', 'USER');

-- AlterTable
ALTER TABLE "Dialogue" ADD COLUMN     "audioUrl" TEXT;

-- AlterTable
ALTER TABLE "Phrase" ADD COLUMN     "audioUrl" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
