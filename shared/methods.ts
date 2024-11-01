import { Phrase, Category } from "@prisma/client";


export const getPhrasesByCategory = async (categoryId: number): Promise<Phrase[]> => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/phrases?categoryId=${categoryId}`
    );
    const data = await response.json();

    return data;
};

export const listCategories = async (): Promise<Category[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
    const data = await response.json();

    return data;
};
