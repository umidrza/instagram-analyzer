import type { InstagramUser } from "@/types/domain";

interface Props {
  users: InstagramUser[];
}

export default function UserTable({ users }: Props) {
  if (users.length === 0) {
    return (
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/70 px-6 py-8 text-center text-sm text-neutral-400">
        No users match this filter.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-800">
      <div className="divide-y divide-neutral-800">
        {users.map((user) => (
          <div
            key={user.username}
            className="flex items-center justify-between px-4 py-3 transition-colors hover:bg-neutral-900/60"
          >
            <span className="text-sm text-neutral-200">{user.username}</span>

            <a
              href={`https://instagram.com/${user.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-blue-400 transition hover:text-blue-300"
            >
              View
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}