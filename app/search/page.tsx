import { Input } from "@/components/ui/input";
import React from "react";

const SearchPage = () => {
    return <div className="w-full max-w-xl mx-auto my-0">
        <h1 className="text-3xl font-bold mt-2 ml-3">Поиск</h1>
        <Input  placeholder="Введите фразу"/>
    </div>;
};

export default SearchPage;
