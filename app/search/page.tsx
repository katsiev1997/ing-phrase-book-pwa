"use client";

import { PhrasesList } from "@/components/phrases-list";
import { Input } from "@/components/ui/input";
import { fetchSearchPhrases } from "@/shared/methods";
import { Phrase } from "@prisma/client";
import { ChangeEvent, useState } from "react";

const SearchPage = () => {
    const [query, setQuery] = useState("");
    const [phrases, setPhrases] = useState<Phrase[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        setError(null);
        if (value.trim() === "") {
            setPhrases([]);
            return;
        }
        try {
            const res = await fetchSearchPhrases(value);
            setPhrases(res);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred");
            }
        }
    };
    return (
        <div className="w-full max-w-xl mx-auto my-0">
            <h1 className="text-3xl font-bold mt-2 ml-3">Поиск</h1>
            <div className="w-full px-5">
                <Input
                    value={query}
                    onChange={handleSearch}
                    className="mt-5"
                    placeholder="Введите фразу"
                />
            </div>
            {error && <p className="text-destructive">{error}</p>}
            {phrases ? (
                <PhrasesList phrases={phrases} />
            ) : (
                <p className="text-destructive">Ничего не найдено</p>
            )}
        </div>
    );
};

export default SearchPage;
