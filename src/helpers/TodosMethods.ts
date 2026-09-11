'use server';

import { env } from '@/lib/env';
import type { ApiResponse, DynamicEndpoint, Tab, Todo } from '@/app/types/interFaces';
import { revalidatePath, revalidateTag } from 'next/cache';
import { tabs, todos } from "../../endpints";

type DynamicEndpointType = tabs | todos;

const getBaseUrl = () => {
    if (env?.BASE_URL) return env.BASE_URL;
    if (process.env.BASE_URL) return process.env.BASE_URL;

    return 'https://todo-app-apis-ay9dx2rpg-hanafi6s-projects.vercel.app';
};
// ---------------------- GET METHODS ----------------------

export async function getTodos(end_point: DynamicEndpoint): Promise<ApiResponse<Todo[]>> {
    try {
        const res = await fetch(`${getBaseUrl()}${end_point}`, {
            next: { tags: ['todos'] }
        });

        if (!res.ok) {
            console.error(`❌ Fetch Todos Failed | Status: ${res.status}`);
            return { data: [], success: false } as unknown as ApiResponse<Todo[]>;
        }

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            console.error(`❌ Returned HTML instead of JSON for getTodos`);
            return { data: [], success: false } as unknown as ApiResponse<Todo[]>;
        }

        return await res.json();
    } catch (error) {
        console.error(`❌ Error in getTodos:`, error);
        return { data: [], success: false } as unknown as ApiResponse<Todo[]>;
    }
}

export async function getTodosById(end_point: DynamicEndpoint, id: string): Promise<ApiResponse<Todo>> {
    try {
        const res = await fetch(`${getBaseUrl()}${end_point}/${id}`, {
            cache: 'no-store',
        });

        if (!res.ok) {
            console.error(`❌ Fetch Todo By Id Failed | Status: ${res.status}`);
            return { success: false } as unknown as ApiResponse<Todo>;
        }

        return await res.json();
    } catch (error) {
        console.error(`❌ Error in getTodosById:`, error);
        return { success: false } as unknown as ApiResponse<Todo>;
    }
}

export async function getTabs(end_point: DynamicEndpoint): Promise<ApiResponse<Tab[]>> {
    try {
        const res = await fetch(`${getBaseUrl()}${end_point}`, {
            next: { tags: ['tabs'] }
        });

        if (!res.ok) {
            console.error(`❌ Fetch Tabs Failed | Status: ${res.status}`);
            return { data: [], success: false } as unknown as ApiResponse<Tab[]>;
        }

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            console.error(`❌ Returned HTML instead of JSON for getTabs`);
            return { data: [], success: false } as unknown as ApiResponse<Tab[]>;
        }

        return await res.json();
    } catch (error) {
        console.error(`❌ Error in getTabs:`, error);
        return { data: [], success: false } as unknown as ApiResponse<Tab[]>;
    }
}

// ---------------------- MUTATION METHODS ----------------------

export async function PostTab<T, P>(
    end_point: DynamicEndpointType,
    payload: P,
    pathToRevalidate: string = '/'
): Promise<ApiResponse<T>> {
    const res = await fetch(`${getBaseUrl()}${end_point}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error(`❌ PostTab Failed | Status: ${res.status}`, errorText);
        throw new Error(`Failed to post tab: ${res.status}`);
    }

    revalidatePath(pathToRevalidate);
    return res.json();
}

export async function updateTab<T, P>(
    end_point: DynamicEndpointType,
    id: string | number,
    payload: P,
    pathToRevalidate: string = '/'
): Promise<ApiResponse<T>> {
    const res = await fetch(`${getBaseUrl()}${end_point}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
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

export async function updateItem<T, P>(
    end_point: DynamicEndpoint,
    id: string | number,
    payload: P,
    tagRevaledate: string = 'todos'
): Promise<ApiResponse<T>> {
    const res = await fetch(`${getBaseUrl()}${end_point}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error(`❌ Update Failed | Status: ${res.status}`, errorText);
        throw new Error(`Failed to update item: ${res.status}`);
    }

    revalidateTag(tagRevaledate, 'mas');
    return res.json();
}

export async function deleteItem<T>(
    end_point: DynamicEndpoint,
    id: string | number,
    pathToRevalidate: string = '/'
): Promise<ApiResponse<T>> {
    const res = await fetch(`${getBaseUrl()}${end_point}/${id}`, {
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
    const res = await fetch(`${getBaseUrl()}${end_point}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error(`❌ AddTodo Failed | Status: ${res.status}`, errorText);
        throw new Error(`Failed to add todo: ${res.status}`);
    }

    revalidatePath(pathToRevalidate);
    return res.json();
}