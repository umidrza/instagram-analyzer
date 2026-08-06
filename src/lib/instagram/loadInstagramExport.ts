import type { InstagramDocuments } from "@/types/instagramDocuments";
import { ZipArchive } from "@/utils/archive";

export async function loadInstagramExport(
  archive: ZipArchive
): Promise<InstagramDocuments> {

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