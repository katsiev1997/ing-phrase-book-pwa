"use client";

import { useState } from "react";
// import { ReactMediaRecorder } from "react-media-recorder";
import { Button } from "../shared/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../shared/ui/select";
import { addPhraseInCategory, fetchListCategories } from "../shared/api/methods";
import { Textarea } from "../shared/ui/textarea";
import { cn } from "../shared/lib/utils";
import { toast } from "../shared/hooks";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Phrase } from "@prisma/client";

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
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState<PhraseFormData>({
        title: "",
        translate: "",
        transcription: "",
        categoryId: 1,
        titleError: false,
        translateError: false,
        transcriptionError: false,
    });
    const {
        data: categories = [],
        isLoading: isCategoriesLoading,
        isError: isCategoriesError,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: fetchListCategories,
        select: (data) => data.sort((a, b) => a.name.localeCompare(b.name)),
    });

    const mutation = useMutation({
        mutationFn: ({
            phrase,
            categoryId,
        }: {
            phrase: Omit<Phrase, "id" | "createdAt" | "updatedAt" | "audioUrl" | "categoryId">;
            categoryId: number;
        }) => addPhraseInCategory(phrase, categoryId),
        onSuccess: () => {
            // Сбрасываем форму после успешной отправки
            setFormData({
                ...formData,
                title: "",
                translate: "",
                transcription: "",
                titleError: false,
                translateError: false,
                transcriptionError: false,
            });
            queryClient.invalidateQueries({ queryKey: ["phrases", formData.categoryId] });
            toast({
                title: "Фраза добавлена",
                description: "Фраза успешно добавлена в категорию",
            });
        },
        onError: () => {
            toast({
                title: "Ошибка",
                description: "Не удалось добавить фразу",
                variant: "destructive",
            });
        },
    });

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

        const isFormValid = validateForm();
        if (!isFormValid) return;

        mutation.mutate({
            phrase: {
                title: formData.title.trim(),
                translate: formData.translate.trim(),
                transcription: formData.transcription.trim(),
            },
            categoryId: Number(formData.categoryId),
        });
    };

    return (
        <div className="w-full max-w-[300px] mx-auto p-4 shadow-md rounded-lg border border-muted-foreground">
            <h2 className="text-xl font-bold mb-4 text-center">Добавить фразу</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {isCategoriesError ? (
                    <div className="text-red-500 text-center">Ошибка загрузки категорий</div>
                ) : (
                    <Select
                        value={String(formData.categoryId)}
                        onValueChange={(value) => setFormData({ ...formData, categoryId: Number(value) })}
                    >
                        <SelectTrigger className="w-full" disabled={isCategoriesLoading}>
                            {isCategoriesLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <SelectValue className="lowercase first-letter:uppercase" placeholder="Выберите категорию" />
                            )}
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {categories.map((category) => (
                                    <SelectItem key={category.id} value={String(category.id)}>
                                        <p className="lowercase first-letter:uppercase">{category.name}</p>
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                )}
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
                <Button className="w-full" disabled={mutation.isPending}>
                    {mutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Сохранить"}
                </Button>
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
