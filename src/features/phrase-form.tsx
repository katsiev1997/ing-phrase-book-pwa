"use client";

import { useLayoutEffect, useState } from "react";
// import { ReactMediaRecorder } from "react-media-recorder";
import { Button } from "../shared/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../shared/ui/select";
import { Category } from "@prisma/client";
import { addPhraseInCategory, fetchListCategories } from "../shared/api/methods";
import { Textarea } from "../shared/ui/textarea";
import { cn } from "../shared/lib/utils";
import { toast } from "../shared/hooks";

type PhraseFormData = {
    title: string;
    translate: string;
    transcription: string;
    categoryId: number;
    titleError: boolean;
    translateError: boolean;
    transcriptionError: boolean;
};

export const PhraseForm = () => {
    const [formData, setFormData] = useState<PhraseFormData>({
        title: "",
        translate: "",
        transcription: "",
        categoryId: 1,
        titleError: false,
        translateError: false,
        transcriptionError: false,
    });
    const [categories, setCategories] = useState<Category[]>([]);

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validateForm = (): boolean => {
        let isValid = true;

        if (formData.title.trim() === "") {
            isValid = false;
            setFormData((prevData) => ({ ...prevData, titleError: true }));
        }
        if (formData.translate.trim() === "") {
            isValid = false;
            setFormData((prevData) => ({ ...prevData, translateError: true }));
        }
        if (formData.transcription.trim() === "") {
            isValid = false;
            setFormData((prevData) => ({ ...prevData, transcriptionError: true }));
        }

        return isValid;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Сброс ошибок перед валидацией
        setFormData((prevData) => ({
            ...prevData,
            titleError: false,
            translateError: false,
            transcriptionError: false,
        }));

        // Проверяем валидность формы
        const isFormValid = validateForm();

        if (!isFormValid) {
            return;
        }

        // Отправляем данные
        addPhraseInCategory(
            { title: formData.title, translate: formData.translate, transcription: formData.transcription },
            Number(formData.categoryId)
        );

        // Сбрасываем форму после успешной отправки
        setFormData({
            title: "",
            translate: "",
            transcription: "",
            categoryId: 1,
            titleError: false,
            translateError: false,
            transcriptionError: false,
        });

        toast({
            title: "Фраза добавлена",
            description: "Фраза успешно добавлена в категорию",
        });
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
                                <SelectItem
                                    onClick={() => setFormData({ ...formData, categoryId: category.id })}
                                    key={category.id}
                                    value={String(category.id)}
                                >
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
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className={cn("mt-1 block w-full rounded-md p-2", formData.titleError && "border-red-500")}
                        placeholder="Введите фразу"
                    />
                </div>

                {/* Поле для перевода */}
                <div>
                    <label className="block text-sm font-medium">Перевод</label>
                    <Textarea
                        name="translate"
                        value={formData.translate}
                        onChange={handleInputChange}
                        className={cn("mt-1 block w-full rounded-md p-2", formData.translateError && "border-red-500")}
                        placeholder="Введите перевод"
                    />
                </div>

                {/* Поле для транскрипции */}
                <div>
                    <label className="block text-sm font-medium">Транскрипция</label>
                    <Textarea
                        name="transcription"
                        value={formData.transcription}
                        onChange={handleInputChange}
                        className={cn("mt-1 block w-full rounded-md p-2", formData.transcriptionError && "border-red-500")}
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
