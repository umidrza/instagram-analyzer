import type { InstagramDocuments } from "@/types/instagramDocuments";
import { readZip } from "@/utils/readZip";

export async function loadInstagramExport(
  file: File
): Promise<InstagramDocuments> {
  const archive = await readZip(file);

  const documents: InstagramDocuments = {
    followers: [],
  };

  if (archive.hasName("following.json")) {
    documents.following =
      archive.getJsonByName<InstagramDocuments["following"]>(
        "following.json"
      );
  }

  if (archive.hasName("pending_follow_requests.json")) {
    documents.pendingRequests =
      archive.getJsonByName<InstagramDocuments["pendingRequests"]>(
        "pending_follow_requests.json"
      );
  }

  for (const path of archive.find(/followers_\d+\.json$/i)) {
    documents.followers.push(
      ...archive.getJson<InstagramDocuments["followers"]>(path)
    );
  }

  return documents;
}