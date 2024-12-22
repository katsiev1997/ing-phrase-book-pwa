import { Category, Phrase } from "@prisma/client";
import axios from "axios";
import { toast } from "../hooks";
import { api } from "./axios";
import { AuthResponse, LoginResponse } from "./interfaces";

export const fetchPhrasesByCategory = async (categoryId: number): Promise<Phrase[]> => {
    const { data } = await api.get(`/phrases`, {
        params: { categoryId },
    });
    return data;
};

export const fetchListCategories = async (): Promise<Category[]> => {
    const { data } = await api.get(`/categories`);
    return data;
};

export const fetchSearchPhrases = async (query: string): Promise<Phrase[]> => {
    if (query.length === 0) {
        throw new Error("Поисковый запрос не может быть пустым");
    }

    try {
        const { data } = await api.get(`/phrases/search`, {
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
): Promise<Phrase | void> => {
    try {
        const { data } = await api.post(`/phrases`, {
            ...phrase,
            categoryId,
        });
        return data;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        toast({
            title: "Ошибка",
            description: "Не удалось добавить фразу",
            variant: "destructive",
        });
    }
};

export const createCategory = async (name: string): Promise<Category | void> => {
    try {
        const { data } = await api.post(`/categories`, { name });
        return data;
    } catch (error) {
        console.error("Error creating category:", error);
        throw error;
    }
};

// Проверка аутентификации пользователя
export async function checkAuth(): Promise<AuthResponse> {
    try {
        const response = await api.get("/auth");
        return response.data;
    } catch (error) {
        console.error("Check auth error:", error);
        return { authenticated: false, error: "Failed to check authentication" };
    }
}
// Вход пользователя
export async function login(email: string): Promise<LoginResponse> {
    try {
        const response = await api.post("/auth/login", { email });
        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        return { success: false, error: "Failed to login" };
    }
}
// Выход пользователя
export async function logout(): Promise<LoginResponse> {
    try {
        const response = await api.post("/auth/logout");
        return response.data;
    } catch (error) {
        console.error("Logout error:", error);
        return { success: false, error: "Failed to logout" };
    }
}
