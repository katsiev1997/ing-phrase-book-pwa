import { PrismaClient } from "@prisma/client";
import { phrases } from "./phrases";

const prisma = new PrismaClient();

async function main() {
    // Извлекаем уникальные категории из `subject`
    const uniqueCategories = Array.from(new Set(phrases.map((phrase) => phrase.subject)));

    // Создаем записи категорий в базе данных
    const categoryRecords = await Promise.all(
        uniqueCategories.map((subject) =>
            prisma.category.upsert({
                where: { name: subject },
                update: {},
                create: { name: subject },
            })
        )
    );

    // Создаем карту категорий для связи названий с их ID
    const categoryMap = categoryRecords.reduce((acc, category) => {
        acc[category.name] = category.id;
        return acc;
    }, {} as Record<string, number>);

    // Добавляем фразы с привязкой к их категориям
    await prisma.phrase.createMany({
        data: phrases.map((phrase) => ({
            title: phrase.rus,
            translate: phrase.ing,
            transcription: phrase.trscp,
            categoryId: categoryMap[phrase.subject], // Подставляем ID категории
        })),
    });

    console.log("Seed completed!");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
