import type { Tab } from ".";

const tabs: Tab[] = [
  "followers",
  "following",
  "mutual",
  "notFollowingBack",
  "fans",
  "pendingRequests"
];

interface Props {
  selected: Tab;
  onChange(tab: Tab): void;
}

export default function UserTabs({
  selected,
  onChange,
}: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`rounded-lg px-4 py-2 ${
            selected === tab
              ? "bg-blue-600 text-white"
              : "bg-neutral-800"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}