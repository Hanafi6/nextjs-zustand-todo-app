import { tabs, todos } from "../../../endpints";

export interface Tab {
    id: string;
    title: string;
    color: string;
    inNavBar: boolean;
    createdAt: string;
}



export interface Todo {
    id: number;
    text: string;
    completed: boolean;
    tabId: number;
    createdAt: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export type GroupByOption = "none" | "tab" | "status" | 'active';
export type DynamicEndpoint = tabs | todos;