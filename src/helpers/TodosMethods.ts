'use server';

import { env } from '@/lib/env'
import type { ApiResponse, DynamicEndpoint, Tab, Todo } from '@/app/types/interFaces';
import { revalidatePath, revalidateTag } from 'next/cache';



export async function getTodos(end_point: DynamicEndpoint): Promise<ApiResponse<Todo[]>> {
    const res = await fetch(`${env.BASE_URL}${end_point}`, {
        next: { tags: ['todos'] }
    });

    if (!res.ok) {
        console.error(`❌ Fetch Failed | Status: ${res.status} ${res.statusText}`);
        const errorText = await res.text();
        console.error(`Response Body:`, errorText);
    }
    return res.json();
}

export async function getTodosById(end_point: DynamicEndpoint, id: string): Promise<ApiResponse<Todo>> {
    const res = await fetch(`${env.BASE_URL}${end_point}/${id}`, {
        cache: 'no-store',
    });

    if (!res.ok) {
        console.error(`❌ Fetch Failed | Status: ${res.status} ${res.statusText}`);
        const errorText = await res.text();
        console.error(`Response Body:`, errorText);
    }
    return res.json();
}




export async function getTabs(end_point: DynamicEndpoint): Promise<ApiResponse<Tab[]>> {
    const res = await fetch(`${env.BASE_URL}${end_point}`, {
        next: { tags: ['tabs'] }
    });

    if (!res.ok) {
        console.error(`❌ Fetch Failed | Status: ${res.status} ${res.statusText}`);
        const errorText = await res.text();
        console.error(`Response Body:`, errorText);

        throw new Error(`Failed to fetch todos: ${res.status}`);
    }
    return res.json();
}

export async function updateItem<T, P>(
    end_point: DynamicEndpoint,
    id: string | number,
    payload: P,
    tagRevaledate: string = '/'
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

    // revalidatePath(pathToRevalidate);
    revalidateTag(tagRevaledate, 'max');
    return res.json();
}

export async function deleteItem<T>(
    end_point: DynamicEndpoint,
    id: string | number,
    pathToRevalidate: string = '/'
): Promise<ApiResponse<T>> {
    const res = await fetch(`${env.BASE_URL}${end_point}/${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error(`❌ Delete Failed | Status: ${res.status}`, errorText);
        throw new Error(`Failed to delete item: ${res.status}`);
    }

    revalidatePath(pathToRevalidate);
    return res.json();
}

export async function AddTodo<T, P>(
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