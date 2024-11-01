"use client";

import { cn } from "@/lib/utils";
import { Heart, PlayCircle } from "lucide-react";
import { useState } from "react";

type Props = {
    translate: string;
    transcription: string;
};

export const PhraseCard = ({ translate, transcription }: Props) => {
    const [liked, setLiked] = useState(false);

    return (
        <div className="flex flex-col gap-2 text-lg">
            <div className="flex justify-between items-center gap-2">
                <p className="border-l-4 border-blue-400 pl-2 text-pretty">{translate}</p>
                <Heart
                    onClick={() => setLiked(!liked)}
                    className={cn(
                        "min-w-8 min-h-8 text-blue-400 active:-translate-y-0.5 active:scale-110 transition-all mr-0.5",
                        { "fill-blue-400": liked }
                    )}
                />
            </div>
            <div className="flex justify-between items-center gap-2">
                <p className="border-l-4 border-blue-700 pl-2 text-pretty italic">{transcription}</p>
                <PlayCircle className=" min-w-9 min-h-9 text-blue-700 active:scale-110 transition-all" />
            </div>
        </div>
    );
};
