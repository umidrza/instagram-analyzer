import StatCard from "./StatCard";
import { AnalysisResult } from "@/types/domain";

export default function StatsGrid({
  data,
}: {
  data: AnalysisResult;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-6">

      <StatCard
        title="Followers"
        value={data.followers.length}
      />

      <StatCard
        title="Following"
        value={data.following.length}
      />

      <StatCard
        title="Mutual"
        value={data.mutual.length}
      />

      <StatCard
        title="Not Following Back"
        value={data.notFollowingBack.length}
      />

      <StatCard
        title="Fans"
        value={data.fans.length}
      />

      <StatCard
        title="Pending Requests"
        value={data.pendingRequests.length}
      />

    </div>
  );
}