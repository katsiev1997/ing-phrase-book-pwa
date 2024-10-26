export const getPhrasesByCategory = async (categoryId: number) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/phrases?categoryId=${categoryId}`
    );
    const data = await response.json();

    return data;
};
