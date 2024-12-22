"use client";

import { PhrasesList } from "@/src/entities/phrase/phrases-list";
import { Input } from "@/src/shared/ui/input";
import { fetchSearchPhrases } from "@/src/shared/api/methods";
import { Phrase } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { Loader } from "lucide-react";

const SearchPage = () => {
    const [query, setQuery] = useState("");
    const { isFetching, isError, data, error, isSuccess } = useQuery<Phrase[], Error>({
        queryKey: ["search", query],
        queryFn: () => fetchSearchPhrases(query),
        enabled: query.length > 0,
    });

    return (
        <div className="w-full h-[calc(100vh-120px)] max-w-xl mx-auto my-0">
            <h1 className="text-3xl font-bold mt-2 ml-3">Поиск</h1>
            <div className="w-full px-5">
                <Input
                    value={query}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                    className="mt-5"
                    placeholder="Введите фразу"
                />
            </div>
            <div className="py-5 h-full">
                {isFetching && (
                    <div className="w-full h-full flex justify-center items-center">
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
