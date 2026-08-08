import { describe, expect, it } from "vitest";
import { analyzeConnections } from "@/lib/instagram/analysis/analyze";
import type { InstagramData } from "@/types/domain";

describe("analyzeConnections", () => {
  it("groups followers into mutual, not following back and fans", () => {
    const data: InstagramData = {
      followers: [
        { username: "alice", href: "https://instagram.com/alice", timestamp: 1 },
        { username: "bob", href: "https://instagram.com/bob", timestamp: 2 },
      ],
      following: [
        { username: "alice", href: "https://instagram.com/alice", timestamp: 1 },
        { username: "carol", href: "https://instagram.com/carol", timestamp: 3 },
      ],
      pendingRequests: [],
    };

    const result = analyzeConnections(data);

    expect(result.mutual.map((user) => user.username)).toEqual(["alice"]);
    expect(result.notFollowingBack.map((user) => user.username)).toEqual(["carol"]);
    expect(result.fans.map((user) => user.username)).toEqual(["bob"]);
  });
});
