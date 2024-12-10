import { Phrase, Category } from "@prisma/client";
import { axiosInstance } from "./axios";
import axios from "axios";

export const fetchPhrasesByCategory = async (categoryId: number): Promise<Phrase[]> => {
    const { data } = await axiosInstance.get(`/phrases`, {
        params: { categoryId },
    });
    return data;
};

export const fetchListCategories = async (): Promise<Category[]> => {
    const { data } = await axiosInstance.get(`/categories`);
    return data;
};

export const fetchSearchPhrases = async (query: string): Promise<Phrase[]> => {
    if (!query) {
        throw new Error("Search query is required");
    }

    try {
        const { data } = await axiosInstance.get(`/phrases/search`, {
            params: { query },
        });
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.error || "Something went wrong";
            console.error("Error fetching phrases:", errorMessage);
            throw new Error(errorMessage);
        }
        throw error;
    }
};

export const addPhraseInCategory = async (
    phrase: { title: string; translate: string; transcription: string },
    categoryId: number
): Promise<Phrase> => {
    const { data } = await axiosInstance.post(`/phrases`, {
        ...phrase,
        categoryId,
    });
    return data;
};
