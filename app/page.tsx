import { PhrasesCategoryList } from "@/components/block/phrases-category-list";
import { Drawer } from "@/components/drawer";

type Props = {
    searchParams: {
        categoryId: string | undefined;
    };
};

export default async function Home({ searchParams: { categoryId } }: Props) {
    return (
        <div className="w-full max-w-xl mx-auto my-0">
            <Drawer activeCategoryId={Number(categoryId || 1)} />
            <h1 className="text-3xl font-bold mt-2 ml-3">Главная</h1>
            <PhrasesCategoryList activeCategoryId={Number(categoryId || 1)} />
        </div>
    );
}
