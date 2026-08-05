import StatCard from "./StatCard";
import type { AnalysisResult } from "@/types/domain";
import type { Tab } from ".";

interface Props {
  data: AnalysisResult;
  selected: Tab;
  onSelect: (tab: Tab) => void;
}

export default function StatsGrid({ data, selected, onSelect }: Props) {
  const categories: Array<{ tab: Tab; title: string; value: number }> = [
    { tab: "followers", title: "Followers", value: data.followers.length },
    { tab: "following", title: "Following", value: data.following.length },
    { tab: "mutual", title: "Mutual", value: data.mutual.length },
    { tab: "notFollowingBack", title: "Not Following Back", value: data.notFollowingBack.length },
    { tab: "fans", title: "Fans", value: data.fans.length },
    { tab: "pendingRequests", title: "Pending Requests", value: data.pendingRequests.length },
  ];

  return (
    <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6">
      {categories.map((category) => (
        <StatCard
          key={category.tab}
          title={category.title}
          value={category.value}
          active={selected === category.tab}
          onClick={() => onSelect(category.tab)}
        />
      ))}
    </div>
  );
}