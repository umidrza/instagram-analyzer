"use client";

import { useMemo, useState } from "react";
import type { AnalysisResult } from "@/types/domain";
import SearchInput from "./SearchInput";
import UserTable from "./UserTable";
import StatsGrid from "./StatsGrid";
import { filterUsersForTab, getDashboardStats } from "./utils";
import type { InstagramTab } from "@/types/domain";

interface Props {
  data: AnalysisResult;
}

export default function Dashboard({ data }: Props) {
  const [tab, setTab] = useState<InstagramTab>("notFollowingBack");
  const [query, setQuery] = useState("");

  const stats = useMemo(() => getDashboardStats(data), [data]);
  const users = useMemo(() => filterUsersForTab(data, tab, query), [data, tab, query]);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-4 shadow-lg shadow-black/20 sm:p-6">
        <StatsGrid stats={stats} selected={tab} onSelect={setTab} />
      </section>

      <SearchInput value={query} onChange={setQuery} />

      <UserTable users={users} />
    </div>
  );
}