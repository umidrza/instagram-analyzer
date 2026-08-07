import StatCard from "./StatCard";
import type { DashboardStat } from "./utils";
import type { InstagramTab } from "@/types/domain";

interface Props {
  stats: DashboardStat[];
  selected: InstagramTab;
  onSelect: (tab: InstagramTab) => void;
}

export default function StatsGrid({ stats, selected, onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6">
      {stats.map((stat) => (
        <StatCard
          key={stat.key}
          title={stat.label}
          value={stat.value}
          active={selected === stat.key}
          onClick={() => onSelect(stat.key)}
        />
      ))}
    </div>
  );
}