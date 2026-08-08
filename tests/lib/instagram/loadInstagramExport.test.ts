import { describe, expect, it } from "vitest";
import { loadInstagramExport } from "@/lib/instagram/loadInstagramExport";
import { InvalidArchiveError } from "@/lib/instagram/errors";
import { ZipArchive } from "@/utils/archive";

function encodeJson(value: unknown) {
  return new TextEncoder().encode(JSON.stringify(value));
}

describe("loadInstagramExport", () => {
  it("loads followers, following and pending requests from the archive", async () => {
    const archive = new ZipArchive({
      "followers.json": encodeJson([
        { string_list_data: [{ href: "https://instagram.com/alice", value: "alice", timestamp: 1 }] },
      ]),
      "followers_1.json": encodeJson([
        { string_list_data: [{ href: "https://instagram.com/bob", value: "bob", timestamp: 2 }] },
      ]),
      "following.json": encodeJson({
        relationships_following: [
          {
            string_list_data: [{ href: "https://instagram.com/alice", value: "alice", timestamp: 1 }],
            title: "alice",
          },
        ],
      }),
      "pending_follow_requests.json": encodeJson([
        {
          timestamp: 3,
          label_values: [
            { label: "Username", value: "carol" },
            { label: "URL", value: "https://instagram.com/carol" },
          ],
        },
      ]),
    });

    const result = await loadInstagramExport(archive);

    expect(result.followers).toHaveLength(2);
    expect(result.following?.relationships_following).toHaveLength(1);
    expect(result.pendingRequests).toHaveLength(1);
  });

  it("throws when no followers export is present", async () => {
    const archive = new ZipArchive({
      "profile_pic.jpg": new Uint8Array([1, 2, 3]),
    });

    await expect(loadInstagramExport(archive)).rejects.toThrow(InvalidArchiveError);
  });
});
