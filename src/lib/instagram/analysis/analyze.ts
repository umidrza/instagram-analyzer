import type { InstagramData } from "@/types/domain";
import { buildUserLookup, createAnalysisResult } from "./utils";

export function analyzeConnections(data: InstagramData) {
  const followerSet = buildUserLookup(data.followers);
  const followingSet = buildUserLookup(data.following);

  return createAnalysisResult(data, followerSet, followingSet);
}