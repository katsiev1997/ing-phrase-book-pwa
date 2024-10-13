import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

// GET /api/categories
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get("id");

        if (categoryId) {
            // Получаем одну категорию по id
            const category = await prisma.category.findUnique({
                where: { id: Number(categoryId) },
                include: {
                    phrases: true, // Включаем связанные фразы
                },
            });

            if (!category) {
                return NextResponse.json({ error: "Category not found" }, { status: 404 });
            }

            return NextResponse.json(category);
        } else {
            // Получаем все категории
            const categories = await prisma.category.findMany({
                include: {
                    phrases: true, // Включаем связанные фразы
                },
            });

            return NextResponse.json(categories);
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST /api/categories
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name } = body;

        if (!name) {
            return NextResponse.json({ error: "Category name is required" }, { status: 400 });
        }

        const newCategory = await prisma.category.create({
            data: {
                name,
            },
        });

        return NextResponse.json(newCategory, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT /api/categories
export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const { id, name } = body;

        if (!id || !name) {
            return NextResponse.json(
                { error: "Category ID and name are required" },
                { status: 400 }
            );
        }

        const updatedCategory = await prisma.category.update({
            where: { id: Number(id) },
            data: {
                name,
            },
        });

        return NextResponse.json(updatedCategory);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE /api/categories
export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get("id");

        if (!categoryId) {
            return NextResponse.json({ error: "Category ID is required" }, { status: 400 });
        }

        // Удаляем категорию
        await prisma.category.delete({
            where: { id: Number(categoryId) },
        });

        return NextResponse.json({ message: "Category deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}