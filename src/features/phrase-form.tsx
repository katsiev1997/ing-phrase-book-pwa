"use client";

import { useLayoutEffect, useState } from "react";
// import { ReactMediaRecorder } from "react-media-recorder";
import { Button } from "../shared/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../shared/ui/select";
import { Category } from "@prisma/client";
import { addPhraseInCategory, fetchListCategories } from "../shared/api/methods";
import { Textarea } from "../shared/ui/textarea";

export const PhraseForm = () => {
    const [title, setTitle] = useState("");
    const [translate, setTranslate] = useState("");
    const [transcription, setTranscription] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryId, setCategoryId] = useState(1);

    const getCategories = async () => {
        try {
            const data = await fetchListCategories();
            const sortedData = data
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((category) => ({ ...category, name: category.name.toLowerCase().trim() }));
            setCategories(sortedData);
        } catch (error) {
            alert(error);
        }
    };

    useLayoutEffect(() => {
        getCategories();
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addPhraseInCategory({ title, translate, transcription }, Number(categoryId));
    };

    return (
        <div className="w-full max-w-[300px] mx-auto p-4 shadow-md rounded-lg border border-muted-foreground">
            <h2 className="text-xl font-bold mb-4 text-center">Добавить фразу</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue className="lowercase first-letter:uppercase" placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {categories.map((category) => (
                                <SelectItem onClick={() => setCategoryId(category.id)} key={category.id} value={String(category.id)}>
                                    <p className="lowercase first-letter:uppercase">{category.name}</p>
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {/* Поле для фразы */}
                <div>
                    <label className="block text-sm font-medium">Фраза</label>
                    <Textarea
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full rounded-md p-2"
                        placeholder="Введите фразу"
                    />
                </div>

                {/* Поле для перевода */}
                <div>
                    <label className="block text-sm font-medium">Перевод</label>
                    <Textarea
                        value={translate}
                        onChange={(e) => setTranslate(e.target.value)}
                        className="mt-1 block w-full rounded-md p-2"
                        placeholder="Введите перевод"
                    />
                </div>

                {/* Поле для транскрипции */}
                <div>
                    <label className="block text-sm font-medium">Транскрипция</label>
                    <Textarea
                        value={transcription}
                        onChange={(e) => setTranscription(e.target.value)}
                        className="mt-1 block w-full rounded-md p-2"
                        placeholder="Введите транскрипцию"
                    />
                </div>
                <Button className="w-full">Сохранить</Button>
                {/* Блок для записи голосового сообщения */}
                {/* <div className="mt-4">
                    <ReactMediaRecorder
                        audio
                        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                            <div className="text-center">
                                <p className="text-sm text-gray-600">Статус: {status}</p>
                                <button
                                    type="button"
                                    onClick={startRecording}
                                    className="bg-green-500 text-white py-2 px-4 rounded-md mt-2"
                                >
                                    Начать запись
                                </button>
                                <button
                                    type="button"
                                    onClick={stopRecording}
                                    className="bg-red-500 text-white py-2 px-4 rounded-md mt-2 ml-2"
                                >
                                    Остановить запись
                                </button>
                                {mediaBlobUrl && (
                                    <div className="mt-4">
                                        <audio src={mediaBlobUrl} controls className="w-full" />
                                    </div>
                                )}
                            </div>
                        )}
                    />
                </div> */}
            </form>
        </div>
    );
};
