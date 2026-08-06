import type { InstagramDocuments } from "@/types/instagramDocuments";
import type { InstagramUser } from "@/types/instagram";

export function parsePendingRequests(docs: InstagramDocuments): InstagramUser[] {
    if (!docs.pendingRequests) {
        return [];
    }

    return docs.pendingRequests.map((item) => {
        const labels = Object.fromEntries(
            item.label_values.map(({ label, value }) => [label, value])
        );

        return {
            username: labels.Username ?? "",
            href: labels.URL ?? "",
            timestamp: item.timestamp,
        };
    });
}