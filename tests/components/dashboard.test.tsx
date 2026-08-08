import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";

import SearchInput from "@/components/dashboard/SearchInput";
import StatCard from "@/components/dashboard/StatCard";
import StatsGrid from "@/components/dashboard/StatsGrid";
import type { DashboardStat } from "@/components/dashboard/utils";
import type { InstagramTab } from "@/types/domain";

describe("dashboard components", () => {
  it("calls the change handler with each typed character and updates the field value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    function ControlledSearchInput() {
      const [value, setValue] = useState("");

      return <SearchInput value={value} onChange={(nextValue) => {
        setValue(nextValue);
        onChange(nextValue);
      }} />;
    }

    render(<ControlledSearchInput />);

    const input = screen.getByPlaceholderText("Search username...");

    await user.type(input, "alex");

    expect(onChange).toHaveBeenLastCalledWith("alex");
    expect(input).toHaveValue("alex");
  });

  it("renders the stat card label and handles clicks", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <StatCard
        title="Followers"
        value={123}
        active={false}
        onClick={onClick}
      />
    );

    const button = screen.getByRole("button", { name: /followers/i });

    expect(button).toHaveTextContent("Followers");
    expect(button).toHaveTextContent("123");
    expect(button).not.toHaveClass("border-blue-500");

    await user.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("highlights the selected stat and calls onSelect for the clicked card", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const stats: DashboardStat[] = [
      { key: "followers", label: "Followers", value: 10 },
      { key: "following", label: "Following", value: 20 },
    ];

    render(<StatsGrid stats={stats} selected={"followers"} onSelect={onSelect} />);

    const followersCard = screen.getByRole("button", { name: /followers/i });
    const followingCard = screen.getByRole("button", { name: /following/i });

    expect(followersCard).toHaveClass("border-blue-500");
    expect(followingCard).not.toHaveClass("border-blue-500");

    await user.click(followingCard);

    expect(onSelect).toHaveBeenCalledWith("following" as InstagramTab);
  });
});
