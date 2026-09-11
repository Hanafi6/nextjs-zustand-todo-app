'use server';

import { ApiResponse } from "@/app/types/interFaces";
import { tabs, todos } from "../../endpints";
import { revalidatePath } from "next/cache";
import { env } from '@/lib/env';

type DynamicEndpoint = tabs | todos;

const getBaseUrl = () => {
    if (env?.BASE_URL) return env.BASE_URL;
    if (process.env.BASE_URL) return process.env.BASE_URL;

    return 'https://todo-app-apis-ay9dx2rpg-hanafi6s-projects.vercel.app';
};
export async function PostTab<T, P>(
    end_point: DynamicEndpoint,
    payload: P,
    pathToRevalidate: string = '/'
): Promise<ApiResponse<T>> {
    try {
        const res = await fetch(`${getBaseUrl()}${end_point}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error(`❌ PostTab Failed | Status: ${res.status}`, errorText);
            throw new Error(`Failed to create item: ${res.status}`);
        }

        revalidatePath(pathToRevalidate);
        return await res.json();
    } catch (error) {
        console.error("❌ Error in PostTab:", error);
        throw error;
    }
}

export async function updateTab<T, P>(
    end_point: DynamicEndpoint,
    id: string | number,
    payload: P,
    pathToRevalidate: string = '/'
): Promise<ApiResponse<T>> {
    try {
        const res = await fetch(`${getBaseUrl()}${end_point}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error(`❌ updateTab Failed | Status: ${res.status}`, errorText);
            throw new Error(`Failed to update item: ${res.status}`);
        }

        revalidatePath(pathToRevalidate);
        return await res.json();
    } catch (error) {
        console.error("❌ Error in updateTab:", error);
        throw error;
    }
}