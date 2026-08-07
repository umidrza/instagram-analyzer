import type { InstagramDocuments } from "@/types/instagramDocuments";
import type { ZipArchive } from "@/utils/archive";
import { InvalidArchiveError } from "./errors";

export async function loadInstagramExport(
  archive: ZipArchive
): Promise<InstagramDocuments> {
  const documents: InstagramDocuments = { followers: [] };

  const followerPaths = archive.find(/followers(_\d+)?\.json$/i);

  if (followerPaths.length === 0) {
    throw new InvalidArchiveError(
      "The ZIP archive does not contain any Instagram followers export files."
    );
  }

  for (const path of followerPaths) {
    documents.followers.push(
      ...archive.getJson<InstagramDocuments["followers"]>(path)
    );
  }

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

  return documents;
}