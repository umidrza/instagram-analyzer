import { AnalysisResult } from "@/types/domain";
import { InstagramData } from "@/types/instagram";

export function analyzeConnections(data: InstagramData): AnalysisResult {
  
  const followerSet = new Set(
    data.followers.map(x => x.username)
  );

  const followingSet = new Set(
    data.following.map(x => x.username)
  );

  const mutual = data.followers.filter(x =>
    followingSet.has(x.username)
  );

  const notFollowingBack = data.following.filter(x =>
    !followerSet.has(x.username)
  );

  const fans = data.followers.filter(x =>
    !followingSet.has(x.username)
  );

  return {
    followers: data.followers,
    following: data.following,
    pendingRequests: data.pendingRequests,
    mutual,
    notFollowingBack,
    fans,
  };
}