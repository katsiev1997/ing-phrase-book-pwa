"use client";

import { Drawer } from "@/components/drawer";
import { PhraseCard } from "@/components/phrase-card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <div className="w-full max-w-xl mx-auto my-0">
            <Button className="absolute left-1/2 bottom-20 z-10 -translate-x-1/2 font-semibold">
                <Drawer />
            </Button>
            <h1 className="text-3xl font-bold mt-2 ml-3">Главная</h1>
            <div className="overflow-y-auto h-[calc(100vh-4rem)] pb-28">
                <Accordion type="single" collapsible className="w-full px-5">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-xl">1 Доброе утро!</AccordionTrigger>
                        <AccordionContent>
                            <PhraseCard
                                translate="Iуйре дика хийла хьа! Iуйре дика хийла шун!"
                                transcription="′ий:ре дика хейла хьа! (к одному лицу) ′ий:ре дика хейла шун! (к двум и более человек)"
                            />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="text-xl">2 Добрый день!</AccordionTrigger>
                        <AccordionContent>
                            <PhraseCard
                                translate="Ди дика хилда хьа!"
                                transcription="Ди дика халда хьа!"
                            />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="text-xl">3 Добрый вечер!</AccordionTrigger>
                        <AccordionContent>
                            <PhraseCard
                                translate="Сайре дика хийла хьа!"
                                transcription="Сайре дика хейла хьа!"
                            />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-xl">1 Доброе утро!</AccordionTrigger>
                        <AccordionContent>
                            <PhraseCard
                                translate="Iуйре дика хийла хьа! Iуйре дика хийла шун!"
                                transcription="′ий:ре дика хейла хьа! (к одному лицу) ′ий:ре дика хейла шун! (к двум и более человек)"
                            />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="text-xl">2 Добрый день!</AccordionTrigger>
                        <AccordionContent>
                            <PhraseCard
                                translate="Ди дика хилда хьа!"
                                transcription="Ди дика халда хьа!"
                            />
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="text-xl">3 Добрый вечер!</AccordionTrigger>
                        <AccordionContent>
                            <PhraseCard
                                translate="Сайре дика хийла хьа!"
                                transcription="Сайре дика хейла хьа!"
                            />
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}
