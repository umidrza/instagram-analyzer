import type { InstagramDocuments } from "@/types/instagramDocuments";
import type { InstagramUser } from "@/types/instagram";

export function parseFollowing(
  docs: InstagramDocuments
): InstagramUser[] {
  if (!docs.following) return [];

  return docs.following.relationships_following.map(({ string_list_data }) => {
    const [user] = string_list_data;

    return {
      username: user.value,
      href: user.href,
      timestamp: user.timestamp,
    };
  });
}