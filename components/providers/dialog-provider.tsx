"use client";

import { ReactNode, useEffect, useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog";

type Props = {
    children: ReactNode;
};

export const DialogProvider = ({ children }: Props) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const showDialog = localStorage.getItem("showDialog");
        if (showDialog === "false") return;
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Вы можете установить это web приложение себе на смартфон. Для того,
                            чтобы установить его нажмите на кнопку “поделиться”, затем “на экран
                            Домой”
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Больше не показывать это сообщение?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsOpen(false)}>
                            Отмена
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                localStorage.setItem("showDialog", "false");
                                setIsOpen(false);
                            }}
                        >
                            Сохранить
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {children}
        </div>
    );
};
