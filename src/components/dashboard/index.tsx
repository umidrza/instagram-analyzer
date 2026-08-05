"use client";

import { useMemo, useState } from "react";
import type { AnalysisResult, InstagramUser } from "@/types/domain";
import SearchInput from "./SearchInput";
import UserTabs from "./UserTabs";
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
      {/* <StatsGrid data={data} /> */}

      <UserTabs
        selected={tab}
        onChange={setTab}
      />

      <SearchInput
        value={query}
        onChange={setQuery}
      />

      <UserTable users={users} />
    </div>
  );
}