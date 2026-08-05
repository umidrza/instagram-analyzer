export interface InstagramUser {
  username: string;
  href?: string;
}

export interface AnalysisResult {
  followers: InstagramUser[];
  following: InstagramUser[];
  pendingRequests: InstagramUser[];

  mutual: InstagramUser[];

  notFollowingBack: InstagramUser[];

  fans: InstagramUser[];
}