import { describe, expect, it } from "vitest";
import { validateFile, validateExport } from "@/lib/instagram/validate";
import { InvalidInstagramExportError, InvalidDocumentError, MissingFileError } from "@/lib/instagram/errors";
import type { InstagramDocuments } from "@/types/instagramDocuments";

describe("validateFile", () => {
  it("rejects files that are not ZIP archives", () => {
    const file = new File(["test"], "archive.txt", { type: "text/plain" });

    expect(() => validateFile(file)).toThrow(InvalidInstagramExportError);
  });

  it("rejects empty ZIP files", () => {
    const file = new File([""], "instagram.zip", { type: "application/zip" });

    expect(() => validateFile(file)).toThrow("The selected file is empty.");
  });

  it("accepts a valid ZIP file", () => {
    const file = new File(["archive"], "instagram.zip", { type: "application/zip" });

    expect(() => validateFile(file)).not.toThrow();
  });
});

describe("validateExport", () => {
  it("throws when followers data is missing", () => {
    const docs = { followers: undefined } as unknown as InstagramDocuments;

    expect(() => validateExport(docs)).toThrow(MissingFileError);
  });

  it("throws when a followers entry is malformed", () => {
    const docs = {
      followers: [{ string_list_data: [{ href: 123, value: null, timestamp: 0 }] }],
    } as unknown as InstagramDocuments;

    expect(() => validateExport(docs)).toThrow(InvalidDocumentError);
  });

  it("accepts a well-formed export", () => {
    const docs: InstagramDocuments = {
      followers: [
        {
          string_list_data: [{ href: "https://instagram.com/alice", value: "alice", timestamp: 1 }],
        },
      ],
      following: {
        relationships_following: [
          {
            string_list_data: [{ href: "https://instagram.com/alice", value: "alice", timestamp: 1 }],
            title: "alice",
          },
        ],
      },
      pendingRequests: [
        {
          timestamp: 2,
          label_values: [
            { label: "Username", value: "bob" },
            { label: "URL", value: "https://instagram.com/bob" },
          ],
        },
      ],
    };

    expect(() => validateExport(docs)).not.toThrow();
  });
});
