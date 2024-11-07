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

export const searchPhrases = async (query: string): Promise<Phrase[]> => {
    if (!query) {
        throw new Error("Search query is required");
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/phrases/search?query=${encodeURIComponent(query)}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Something went wrong");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching phrases:", error);
        throw error; // Перебрасываем ошибку для дальнейшей обработки
    }
};