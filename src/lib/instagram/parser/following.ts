import type { InstagramDocuments } from "@/types/instagramDocuments";
import type { InstagramUser } from "@/types/domain";

export function parseFollowing(docs: InstagramDocuments): InstagramUser[] {
  if (!docs.following) {
    return [];
  }

  return docs.following.relationships_following.map(({ string_list_data, title }) => {
    const [user] = string_list_data;

    return {
      username: title,
      href: user.href,
      timestamp: user.timestamp,
    };
  });
}