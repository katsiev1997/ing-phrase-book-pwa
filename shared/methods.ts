import { Phrase, Category } from "@prisma/client";

export const getPhrasesByCategory = async (categoryId: number): Promise<Phrase[]> => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/phrases?categoryId=${categoryId}`
    );
    return await response.json();
};

export const getListCategories = async (): Promise<Category[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
    return await response.json();
};
