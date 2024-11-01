import { Drawer } from "@/components/drawer";
import { PhrasesList } from "@/components/phrases-list";
import { getPhrasesByCategory } from "@/shared/methods";

type Props = {
    searchParams: {
        categoryId: string | undefined;
    };
};



export default async function Home({ searchParams: { categoryId } }: Props) {
    const phrases = await getPhrasesByCategory(Number(categoryId) || 1);
    return (
        <div className="w-full max-w-xl mx-auto my-0">
            <Drawer activeCategoryId={Number(categoryId || 1)} />
            <h1 className="text-3xl font-bold mt-2 ml-3">Главная</h1>
            <PhrasesList phrases={phrases} />
        </div>
    );
}
