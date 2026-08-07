import type { AnalysisResult, InstagramTab, InstagramUser } from "@/types/domain";
import { DASHBOARD_TABS } from "@/constants/dashboard";

export interface DashboardStat {
  key: InstagramTab;
  label: string;
  value: number;
}

export function getDashboardStats(data: AnalysisResult): DashboardStat[] {
  return DASHBOARD_TABS.map((tab) => ({
    key: tab.key,
    label: tab.label,
    value: data[tab.key].length,
  }));
}

export function filterUsersForTab(
  data: AnalysisResult,
  tab: InstagramTab,
  query: string
): InstagramUser[] {
  const normalizedQuery = query.trim().toLowerCase();
  const users = data[tab];

  if (!normalizedQuery) {
    return users;
  }

  return users.filter((user) =>
    user.username.toLowerCase().includes(normalizedQuery)
  );
}
