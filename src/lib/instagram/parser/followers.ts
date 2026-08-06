import type { InstagramDocuments } from "@/types/instagramDocuments";
import type { InstagramUser } from "@/types/instagram";

export function parseFollowers(
    docs: InstagramDocuments
): InstagramUser[] {
    if (!docs.followers) {
        return [];
    }

    return docs.followers.map(({ string_list_data }) => {
        const [user] = string_list_data;

        return {
            username: user.value,
            href: user.href,
            timestamp: user.timestamp,
        };
    });
}