export interface InstagramUser {
  username: string;
  href: string;
  timestamp?: number;
}

export type InstagramUserList = InstagramUser[];

export interface InstagramData {
  followers: InstagramUserList;
  following: InstagramUserList;
  pendingRequests: InstagramUserList;
}

export type AnalysisResult = InstagramData & {
  mutual: InstagramUserList;
  notFollowingBack: InstagramUserList;
  fans: InstagramUserList;
};

export type InstagramTab = keyof AnalysisResult;
