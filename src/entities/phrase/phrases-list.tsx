import { PhraseCard } from "@/src/entities/phrase/phrase-card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/src/shared/ui/accordion";
import { Phrase } from "@prisma/client";

type Props = {
    phrases: Phrase[];
};

export const PhrasesList = ({ phrases }: Props) => {
    return (
        <div className="overflow-y-auto h-[calc(100vh-4rem)] pb-32">
            <Accordion type="single" collapsible className="w-full px-5">
                {phrases.map((phrase, i) => (
                    <AccordionItem key={i} value={i.toString()}>
                        <AccordionTrigger className="text-lg text-start font-medium">
                            {phrase.title}
                        </AccordionTrigger>
                        <AccordionContent>
                            <PhraseCard
                                translate={phrase.translate}
                                transcription={phrase.transcription}
                            />
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
};
