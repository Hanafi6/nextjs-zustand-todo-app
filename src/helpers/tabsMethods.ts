import { ApiResponse, DynamicEndpoint, Tab } from "@/app/types/interFaces";
import { PostTab, updateTab } from "./tabsActions";
import { env } from "@/lib/env";

export type CreateTabInput = Omit<Tab, "id" | "createdAt"> & {
    PathName: string;

};


export interface updateInp {
    id: string,
    status: boolean,
    PathName?: string
}


export async function addTab({
    color = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`,
    inNavBar,
    title,
    PathName,
}: CreateTabInput) {
    const TabInformitions = {
        color,
        inNavBar,
        title,
    };

    const tab = await PostTab('/api/tabs', TabInformitions, PathName);
    return tab;
}

export async function TggeleTabFromNavBar({ id, status, PathName = '/' }: updateInp) {
    updateTab('/api/tabs', id, { inNavBar: !status }, PathName);
}

export async function getTbs(end_point: DynamicEndpoint): Promise<ApiResponse<Tab[]>> {
    const res = await fetch(`${env.BASE_URL}${end_point}`, {
        cache: 'no-store',
    });

    if (!res.ok) {
        console.error(`❌ Fetch Failed | Status: ${res.status} ${res.statusText}`);
        const errorText = await res.text();
        console.error(`Response Body:`, errorText);
    }
    return res.json();
}