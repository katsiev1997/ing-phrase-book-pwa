import React from "react";

const DialogsPage = () => {
    return (
        <div className="w-full h-[calc(100vh-120px)]">
            <h1 className="text-3xl font-bold mt-2 ml-3">Диалоги</h1>
            <div className="w-full h-full flex justify-center items-center px-5">
                <div className="w-full flex flex-col gap-4 border-2 rounded-2xl p-4 bg-primary-foreground">
                    <div className="w-full flex">
                        <div className="flex flex-col p-2 border rounded-xl rounded-bl-none bg-primary text-primary-foreground">
                            <p className="font-medium">Доброе утро!</p>
                            <p className="text-sm opacity-70 leading-none ml-2">Уйре дика хийла хьа!</p>
                        </div>
                    </div>
                    <div className="w-full flex justify-end">
                        <div className="flex flex-col p-2 border rounded-xl rounded-br-none bg-primary-foreground text-primary">
                            <p className="font-medium">И тебе доброго утра!</p>
                            <p className="text-sm opacity-70 leading-none ml-2">Хьа хийла уйре дика!</p>
                        </div>
                    </div>
                    <div className="w-full flex">
                        <div className="flex flex-col p-2 border rounded-xl rounded-bl-none bg-primary text-primary-foreground">
                            <p className="font-medium">Как дела!</p>
                            <p className="text-sm opacity-70 leading-none ml-2">Фу деш да шо!</p>
                        </div>
                    </div>
                    <div className="w-full flex justify-end">
                        <div className="relative flex flex-col p-2 border rounded-xl rounded-br-none bg-primary-foreground text-primary">
                            <p className="font-medium">Все хорошо!</p>
                            <p className="text-sm opacity-70 leading-none ml-2">Хьам дац, могаш лел!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DialogsPage;
