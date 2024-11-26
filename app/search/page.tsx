"use client";

import { PhrasesList } from "@/components/phrases-list";
import { Input } from "@/components/ui/input";
import { fetchSearchPhrases } from "@/shared/methods";
import { Phrase } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { ChangeEvent, useState } from "react";

const SearchPage = () => {
    const [query, setQuery] = useState("");
    const { isLoading, isError, data, error, isSuccess } = useQuery<Phrase[], Error>({
        queryKey: ["search", query],
        queryFn: () => fetchSearchPhrases(query),
    });

    return (
        <div className="w-full max-w-xl mx-auto my-0">
            <h1 className="text-3xl font-bold mt-2 ml-3">Поиск</h1>
            <div className="w-full px-5">
                <Input
                    value={query}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                    className="mt-5"
                    placeholder="Введите фразу"
                />
            </div>
            <div className="py-5">
                {isLoading && (
                    <div className="flex items-center justify-center h-96">
                        <Loader size={40} className="animate-spin" />
                    </div>
                )}
                {query && isError && <p className="text-destructive">{error.message}</p>}
                {data?.length === 0 && <p className="text-muted">Фразы не найдены</p>}
                {isSuccess && <PhrasesList phrases={data} />}
            </div>
        </div>
    );
};

export default SearchPage;
