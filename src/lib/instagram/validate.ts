import type { InstagramDocuments } from "@/types/instagramDocuments";
import {
  InvalidInstagramExportError,
  InvalidDocumentError,
  MissingFileError,
} from "./errors";

export function validateFile(file: File) {
  if (!(file instanceof File)) {
    throw new InvalidInstagramExportError("No file selected.");
  }

  if (file.type !== "application/zip" && !file.name.toLowerCase().endsWith(".zip")) {
    throw new InvalidInstagramExportError("Please upload a valid Instagram ZIP export.");
  }

  if (file.size === 0) {
    throw new InvalidInstagramExportError("The selected file is empty.");
  }

  const MAX_SIZE = 100 * 1024 * 1024;

  if (file.size > MAX_SIZE) {
    throw new InvalidInstagramExportError("The ZIP file is too large (maximum 100 MB). Use a smaller export.");
  }
}

export function validateExport(exportData: InstagramDocuments) {
  if (!exportData || typeof exportData !== "object") {
    throw new InvalidInstagramExportError("Instagram export data is invalid.");
  }

  if (!Array.isArray(exportData.followers)) {
    throw new MissingFileError("Followers data is missing or malformed.");
  }

  validateFollowersDocument(exportData.followers);

  if (exportData.following !== undefined) {
    validateFollowingDocument(exportData.following);
  }

  if (exportData.pendingRequests !== undefined) {
    validatePendingRequestsDocument(exportData.pendingRequests);
  }
}

function validateFollowersDocument(
  followers: InstagramDocuments["followers"]
) {
  if (!Array.isArray(followers)) {
    throw new MissingFileError("Followers export is not valid.");
  }

  followers.forEach((entry, index) => {
    if (!entry || !Array.isArray(entry.string_list_data)) {
      throw new InvalidDocumentError(
        `followers.json entry ${index} is malformed.`
      );
    }

    const [user] = entry.string_list_data;

    if (!user || typeof user.value !== "string" || typeof user.href !== "string") {
      throw new InvalidDocumentError(
        `followers.json entry ${index} has invalid user data.`
      );
    }
  });
}

function validateFollowingDocument(
  following: InstagramDocuments["following"]
) {
  if (
    !following ||
    !Array.isArray(following.relationships_following)
  ) {
    throw new InvalidDocumentError(
      "following.json is malformed or missing required fields."
    );
  }

  following.relationships_following.forEach((entry, index) => {
    if (!entry || typeof entry.title !== "string" || !Array.isArray(entry.string_list_data)) {
      throw new InvalidDocumentError(
        `following.json entry ${index} is malformed.`
      );
    }

    const [user] = entry.string_list_data;

    if (!user || typeof user.href !== "string") {
      throw new InvalidDocumentError(
        `following.json entry ${index} has invalid user data.`
      );
    }
  });
}

function validatePendingRequestsDocument(
  pendingRequests: InstagramDocuments["pendingRequests"]
) {
  if (!Array.isArray(pendingRequests)) {
    throw new InvalidDocumentError(
      "pending_follow_requests.json is malformed."
    );
  }

  pendingRequests.forEach((entry, index) => {
    if (!entry || typeof entry.timestamp !== "number" || !Array.isArray(entry.label_values)) {
      throw new InvalidDocumentError(
        `pending_follow_requests.json entry ${index} is malformed.`
      );
    }

    const usernameLabel = entry.label_values.find((label) => label.label === "Username");
    const urlLabel = entry.label_values.find((label) => label.label === "URL");

    if (!usernameLabel || typeof usernameLabel.value !== "string") {
      throw new InvalidDocumentError(
        `pending_follow_requests.json entry ${index} is missing a Username label.`
      );
    }

    if (!urlLabel || typeof urlLabel.value !== "string") {
      throw new InvalidDocumentError(
        `pending_follow_requests.json entry ${index} is missing a URL label.`
      );
    }
  });
}
