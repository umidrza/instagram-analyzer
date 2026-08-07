import type { AnalysisResult, InstagramData, InstagramUser } from "@/types/domain";

export function buildUserLookup(users: InstagramUser[]) {
  return new Set(users.map((user) => user.username));
}

export function createAnalysisResult(
  data: InstagramData,
  followerSet: Set<string>,
  followingSet: Set<string>
): AnalysisResult {
  const mutual = data.followers.filter((user) => followingSet.has(user.username));
  const notFollowingBack = data.following.filter((user) => !followerSet.has(user.username));
  const fans = data.followers.filter((user) => !followingSet.has(user.username));

  return {
    followers: data.followers,
    following: data.following,
    pendingRequests: data.pendingRequests,
    mutual,
    notFollowingBack,
    fans,
  };
}
