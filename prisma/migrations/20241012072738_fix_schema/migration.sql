/*
  Warnings:

  - You are about to drop the `_PhraseToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PhraseToUser" DROP CONSTRAINT "_PhraseToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_PhraseToUser" DROP CONSTRAINT "_PhraseToUser_B_fkey";

-- DropTable
DROP TABLE "_PhraseToUser";

-- CreateTable
CREATE TABLE "_FavoritePhrases" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FavoritePhrases_AB_unique" ON "_FavoritePhrases"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoritePhrases_B_index" ON "_FavoritePhrases"("B");

-- AddForeignKey
ALTER TABLE "_FavoritePhrases" ADD CONSTRAINT "_FavoritePhrases_A_fkey" FOREIGN KEY ("A") REFERENCES "Phrase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritePhrases" ADD CONSTRAINT "_FavoritePhrases_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
