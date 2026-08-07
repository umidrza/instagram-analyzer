import type { InstagramTab } from "@/types/domain";

export const DASHBOARD_TABS: ReadonlyArray<{ key: InstagramTab; label: string }> = [
  {
    key: "followers",
    label: "Followers",
  },
  {
    key: "following",
    label: "Following",
  },
  {
    key: "mutual",
    label: "Mutual",
  },
  {
    key: "notFollowingBack",
    label: "Don't Follow Back",
  },
  {
    key: "fans",
    label: "Fans",
  },
  {
    key: "pendingRequests",
    label: "Pending Requests",
  },
];