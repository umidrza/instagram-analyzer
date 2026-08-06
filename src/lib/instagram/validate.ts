import type { InstagramDocuments } from "@/types/instagramDocuments";
import { InvalidInstagramExportError, MissingFileError } from "./errors";

export function validateFile(file: File) {
  if (!file) {
    throw new InvalidInstagramExportError("No file provided");
  }

  if (file.type !== "application/zip" && !file.name.endsWith(".zip")) {
    throw new InvalidInstagramExportError("Please upload a valid Instagram ZIP export.");
  }

  if (file.size === 0) {
    throw new InvalidInstagramExportError("The selected file is empty.");
  }

  const MAX_SIZE = 500 * 1024 * 1024;

  if (file.size > MAX_SIZE) {
    throw new InvalidInstagramExportError("The ZIP file is too large (maximum 500 MB).");
  }

  const hasInstagramFiles = file.name.includes("instagram");

  if (!hasInstagramFiles) {
    throw new InvalidInstagramExportError("The uploaded ZIP is not an Instagram export.");
  }
}

export function validateExport(
  exportData: InstagramDocuments
) {
  if (!exportData || typeof exportData !== "object") {
    throw new InvalidInstagramExportError();
  }

  if (!exportData.following) {
    throw new MissingFileError(
      "following.json missing"
    );
  }

  if (!exportData.followers) {
    throw new MissingFileError(
      "followers not found"
    );
  }

  if (!exportData.pendingRequests) {
    throw new MissingFileError(
      "pending requests not found"
    );
  }
}