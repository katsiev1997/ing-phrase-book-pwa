
import { PhraseCard } from "@/components/phrase-card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Phrase } from "@prisma/client";

type Props = {
    phrases: Phrase[];
};

export const PhrasesList = ({ phrases }: Props) => {
    return (
        <div className="overflow-y-auto h-[calc(100vh-4rem)] pb-28">
            <Accordion type="single" collapsible className="w-full px-5">
                {phrases.map((phrase, i) => (
                    <AccordionItem key={i} value={i.toString()}>
                        <AccordionTrigger className="text-xl text-start">
                            {i + 1}. {phrase.title}
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
