export interface InstagramUser {
  username: string;
  href: string;
  timestamp?: number;
}

export interface InstagramData {
  followers: InstagramUser[];
  following: InstagramUser[];
  pendingRequests: InstagramUser[];
}
