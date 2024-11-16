"use client";

import { fetchPhrasesByCategory } from "@/shared/methods";
import { Phrase } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import { PhrasesList } from "../phrases-list";

type Props = {
    activeCategoryId: number;
};

export const PhrasesCategoryList = ({ activeCategoryId }: Props) => {
    const { isLoading, isError, data, error, isSuccess } = useQuery<Phrase[], Error>({
        queryKey: ["phrases", activeCategoryId],
        queryFn: () => fetchPhrasesByCategory(activeCategoryId),
    });

    if (isLoading) {
        return (
            <div className="flex flex-col gap-3 pt-5">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-start py-1 px-5">
                        <div className="space-y-2">
                            <Skeleton className="h-5 w-[250px]" />
                            <Skeleton className="h-5 w-[200px]" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-red-500 text-center text-lg">
                Произошла ошибка при загрузке: {error.message}
            </div>
        );
    }

    return isSuccess && <PhrasesList phrases={data} />;
};
