import { Category } from "@prisma/client";

export const listCategories = async (): Promise<Category[]> => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`
    );
    const data = await response.json();

    return data;
};
