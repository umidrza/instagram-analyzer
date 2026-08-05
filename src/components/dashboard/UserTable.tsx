import type { InstagramUser } from "@/types/domain";

interface Props {
  users: InstagramUser[];
}

export default function UserTable({
  users,
}: Props) {
  return (
    <div className="rounded-xl border border-neutral-800">
      {users.map((user) => (
        <div
          key={user.username}
          className="flex items-center justify-between border-b border-neutral-800 px-4 py-3 last:border-b-0"
        >
          <span>{user.username}</span>

          <a
            href={`https://instagram.com/${user.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            View
          </a>
        </div>
      ))}
    </div>
  );
}