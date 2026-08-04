import type { InstagramDocuments } from "@/types/instagramDocuments";
import { readZip } from "@/utils/readZip";

export async function loadInstagramExport(
  file: File
): Promise<InstagramDocuments> {
  const docs = await readZip(file);

  const documents: InstagramDocuments = {
    followers: [],
  };

  for (const doc of docs) {
    const name = doc.name;
    const data = doc.data

    switch (name) {
      case "following.json":
        documents.following = data as InstagramDocuments["following"];
        break;

      case "pending_follow_requests.json":
        documents.pendingRequests = data as InstagramDocuments["pendingRequests"];
        break;
    }

    if (/followers_\d+\.json$/i.test(name ?? "")) {
      documents.followers.push(...(data as InstagramDocuments["followers"]));
    }
  }

  return documents;
}