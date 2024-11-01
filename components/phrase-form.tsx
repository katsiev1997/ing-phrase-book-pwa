"use client";

import { useState } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import { Input } from "./ui/input";

export const PhraseForm = () => {
    const [phrase, setPhrase] = useState("");
    const [translation, setTranslation] = useState("");
    const [transcription, setTranscription] = useState("");

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-center">Создать фразу</h2>
            <form className="space-y-4">
                {/* Поле для фразы */}
                <div>
                    <label className="block text-sm font-medium">Фраза</label>
                    <Input
                        type="text"
                        value={phrase}
                        onChange={(e) => setPhrase(e.target.value)}
                        className="mt-1 block w-full border rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Введите фразу"
                    />
                </div>

                {/* Поле для перевода */}
                <div>
                    <label className="block text-sm font-medium">Перевод</label>
                    <Input
                        type="text"
                        value={translation}
                        onChange={(e) => setTranslation(e.target.value)}
                        className="mt-1 block w-full border rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Введите перевод"
                    />
                </div>

                {/* Поле для транскрипции */}
                <div>
                    <label className="block text-sm font-medium">Транскрипция</label>
                    <Input
                        type="text"
                        value={transcription}
                        onChange={(e) => setTranscription(e.target.value)}
                        className="mt-1 block w-full border rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Введите транскрипцию"
                    />
                </div>

                {/* Блок для записи голосового сообщения */}
                <div className="mt-4">
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
                </div>
            </form>
        </div>
    );
};
