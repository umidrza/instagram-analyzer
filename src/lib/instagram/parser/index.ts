import type { InstagramData } from "@/types/instagram";
import { parseFollowers } from "./followers";
import { parseFollowing } from "./following";
import { parsePendingRequests } from "./pendingRequests";
import { loadInstagramExport } from "../loadInstagramExport";

export async function parseFile(file: File): Promise<InstagramData> {
    const data = await loadInstagramExport(file);
    return {
        followers: parseFollowers(data),
        following: parseFollowing(data),
        pendingRequests: parsePendingRequests(data),
    };
}