'use server'

import { ApiResponse } from "@/app/types/interFaces";
import { tabs, todos } from "../../endpints";
import { revalidatePath } from "next/cache";
import { env } from '@/lib/env'

type DynamicEndpoint = tabs | todos;


export async function PostTab<T, P>(
    end_point: DynamicEndpoint,
    payload: P,
    pathToRevalidate: string = '/'
): Promise<ApiResponse<T>> {
    const res = await fetch(`${env.BASE_URL}${end_point}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        const errorText = await res.text();
        console.error(`❌ Update Failed | Status: ${res.status}`, errorText);
        throw new Error(`Failed to update item: ${res.status}`);
    }

    revalidatePath(pathToRevalidate);
    return res.json();
}

export async function updateTab<T, P>(
    end_point: DynamicEndpoint,
    id: string | number,
    payload: P,
    pathToRevalidate: string = '/'
): Promise<ApiResponse<T>> {
    const res = await fetch(`${env.BASE_URL}${end_point}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error(`❌ Update Failed | Status: ${res.status}`, errorText);
        throw new Error(`Failed to update item: ${res.status}`);
    }

    revalidatePath(pathToRevalidate);
    return res.json();
}

