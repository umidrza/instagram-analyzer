"use client";

import { useMemo, useState } from "react";
import type { AnalysisResult, InstagramUser } from "@/types/domain";
import SearchInput from "./SearchInput";
import UserTable from "./UserTable";
import StatsGrid from "./StatsGrid";

export type Tab =
  | "followers"
  | "following"
  | "mutual"
  | "notFollowingBack"
  | "fans"
  | "pendingRequests";

interface Props {
  data: AnalysisResult;
}

export default function Dashboard({ data }: Props) {
  const [tab, setTab] = useState<Tab>("notFollowingBack");
  const [query, setQuery] = useState("");

  const users = useMemo<InstagramUser[]>(() => {
    const list = data[tab];

    return list.filter((user) =>
      user.username
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }, [data, tab, query]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-4 shadow-lg shadow-black/20 sm:p-6">
        <StatsGrid data={data} selected={tab} onSelect={setTab} />
      </div>

      <SearchInput value={query} onChange={setQuery} />

      <UserTable users={users} />
    </div>
  );
}