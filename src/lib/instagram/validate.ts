import type { InstagramDocuments } from "@/types/instagramDocuments";
import { MissingFileError } from "./errors";

export function validateExport(
  exportData: InstagramDocuments
) {
  if (!exportData.following) {
    throw new MissingFileError(
      "following.json missing"
    );
  }

  if (exportData.followers.length === 0) {
    throw new MissingFileError(
      "followers not found"
    );
  }

  if (exportData.pendingRequests && exportData.pendingRequests.length === 0) {
    throw new MissingFileError(
      "pending requests not found"
    );
  }
}