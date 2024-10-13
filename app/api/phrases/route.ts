import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

// GET /api/phrases
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = req.nextUrl;
        const phraseId = searchParams.get("id");

        if (phraseId) {
            // Получение одной фразы по id
            const phrase = await prisma.phrase.findUnique({
                where: { id: Number(phraseId) },
                include: {
                    category: true, // включаем категорию
                    favoritedBy: true // включаем пользователей, которые добавили в избранное
                }
            });

            if (!phrase) {
                return NextResponse.json({ error: "Phrase not found" }, { status: 404 });
            }

            return NextResponse.json(phrase);
        } else {
            // Получение всех фраз
            const phrases = await prisma.phrase.findMany({
                include: {
                    category: true,
                    favoritedBy: true,
                }
            });

            return NextResponse.json(phrases);
        }
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


// POST /api/phrases
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const { title, translate, transcription, audioUrl, categoryId } = body;

        const newPhrase = await prisma.phrase.create({
            data: {
                title,
                translate,
                transcription,
                audioUrl, // Поле может быть пустым (optional)
                category: {
                    connect: { id: Number(categoryId) } // Подключаем категорию через внешний ключ
                }
            }
        });

        return NextResponse.json(newPhrase, { status: 201 });
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


// PUT /api/phrases
export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, title, translate, transcription, audioUrl, categoryId } = body;

        const updatedPhrase = await prisma.phrase.update({
            where: { id: Number(id) },
            data: {
                title,
                translate,
                transcription,
                audioUrl,
                category: {
                    connect: { id: Number(categoryId) }
                }
            }
        });

        return NextResponse.json(updatedPhrase);
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


// DELETE /api/phrases
export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const phraseId = searchParams.get("id");

        if (!phraseId) {
            return NextResponse.json({ error: "Phrase ID is required" }, { status: 400 });
        }

        await prisma.phrase.delete({
            where: { id: Number(phraseId) }
        });

        return NextResponse.json({ message: "Phrase deleted successfully" }, { status: 200 });
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

