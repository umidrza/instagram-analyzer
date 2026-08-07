import type { InstagramData } from "@/types/domain";
import type { InstagramDocuments } from "@/types/instagramDocuments";
import { parseFollowers } from "./followers";
import { parseFollowing } from "./following";
import { parsePendingRequests } from "./pendingRequests";

export async function parseFile(docs: InstagramDocuments): Promise<InstagramData> {
  return {
    followers: parseFollowers(docs),
    following: parseFollowing(docs),
    pendingRequests: parsePendingRequests(docs),
  };
}