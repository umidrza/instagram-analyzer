import { describe, expect, it } from "vitest";
import { parseFile } from "@/lib/instagram/parser";
import type { InstagramDocuments } from "@/types/instagramDocuments";

describe("parseFile", () => {
  it("normalizes raw Instagram documents into user lists", async () => {
    const docs: InstagramDocuments = {
      followers: [
        {
          string_list_data: [{ href: "https://instagram.com/alice", value: "alice", timestamp: 10 }],
        },
      ],
      following: {
        relationships_following: [
          {
            string_list_data: [{ href: "https://instagram.com/bob", value: "bob", timestamp: 20 }],
            title: "bob",
          },
        ],
      },
      pendingRequests: [
        {
          timestamp: 30,
          label_values: [
            { label: "Username", value: "carol" },
            { label: "URL", value: "https://instagram.com/carol" },
          ],
        },
      ],
    };

    const result = await parseFile(docs);

    expect(result.followers).toEqual([
      { username: "alice", href: "https://instagram.com/alice", timestamp: 10 },
    ]);
    expect(result.following).toEqual([
      { username: "bob", href: "https://instagram.com/bob", timestamp: 20 },
    ]);
    expect(result.pendingRequests).toEqual([
      { username: "carol", href: "https://instagram.com/carol", timestamp: 30 },
    ]);
  });
});
