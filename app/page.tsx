import { getPhrasesByCategory } from "@/actions/get-phrases-by-category";
import { Drawer } from "@/components/drawer";
import { PhrasesList } from "@/components/phrases-list";

type SearchParams = { categoryId: string | undefined };

export default async function Home({
    searchParams: { categoryId },
}: {
    searchParams: SearchParams;
}) {
    const phrases = await getPhrasesByCategory(Number(categoryId) || 1);
    return (
        <div className="w-full max-w-xl mx-auto my-0">
            <Drawer activeCategoryId={Number(categoryId || 1)}/>
            <h1 className="text-3xl font-bold mt-2 ml-3">Главная</h1>
            <PhrasesList phrases={phrases} />
        </div>
    );
}
