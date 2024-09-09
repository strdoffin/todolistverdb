'use server'
import { db } from "@/lib/db";

export const CheckTodo = async (id: number, checked: boolean) => {
    try {
        await db.post.update({
            where: { id },
            data: { check: checked },
        });
    } catch (error) {
        console.error("Failed to update checkbox status:", error);
    }
};