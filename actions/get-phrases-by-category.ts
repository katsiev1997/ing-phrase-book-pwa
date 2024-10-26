import { Phrase } from "@prisma/client";

export const getPhrasesByCategory = async (categoryId: number): Promise<Phrase[]> => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/phrases?categoryId=${categoryId}`
    );
    const data = await response.json();

    return data;
};
