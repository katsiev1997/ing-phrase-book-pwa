import { NextResponse } from "next/server";
import { cookies } from "next/headers";
export async function POST() {
    try {
        // Удаляем куки с токеном
        cookies().delete("token");

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
