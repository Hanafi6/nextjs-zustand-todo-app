"use server";

import { env } from "@/lib/env";
import { revalidatePath } from "next/cache";
import { todos } from "../../endpints";
import { updateItem } from "./TodosMethods";
import { Todo } from "@/app/types/interFaces";

const BASE_URL = env.BASE_URL;

export async function addTodoAction(prevState: any, formData: FormData) {
    const text = formData.get("text") as string;
    const tabId = formData.get("tabId") as string;

    if (!text || !tabId) {
        return { success: false, error: "بيانات غير مكتملة" };
    }

    try {
        const res = await fetch(`${BASE_URL}/api/todos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, tabId }),
        });
        const data = await res.json()
        revalidatePath("/");
        return { data, success: true, error: null };
    } catch (error) {
        return { success: false, error: "حدث خطأ أثناء الإضافة" };
    }
}

export async function toggleTodoAction(id: number, currentStatus: boolean) {
    await fetch(`${BASE_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !currentStatus }),
    });

    revalidatePath("/");
}

export async function deleteTodoAction(id: number) {
    await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });

    revalidatePath("/");
}

interface ToggleTodoPayload {
    completed: boolean;
}

export async function toggleStatusTodo(
    id: string | number,
    payload: ToggleTodoPayload,
    pathName: string = "/"
) {
    try {
        const response = await updateItem<Todo, ToggleTodoPayload>(
            "/api/todos",
            id,
            payload,
            pathName
        );

        return {
            success: true,
            data: response.data,
            error: null,
        };
    } catch (error: any) {
        console.error("❌ Error toggling todo status:", error.message);
        return {
            success: false,
            data: null,
            error: error.message || "Failed to toggle todo status",
        };
    }
}