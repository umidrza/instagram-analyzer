interface InstagramStringData {
  href: string;
  value: string;
  timestamp: number;
}

interface InstagramEntry {
  string_list_data: InstagramStringData[];
}

export interface InstagramLabelValue {
  label: string;
  value: string;
}

export interface PendingRequestsDocument {
  timestamp: number;
  label_values: InstagramLabelValue[];
}

interface FollowingDocument {
  relationships_following: InstagramEntry[];
}


export interface InstagramDocuments {
  followers: InstagramEntry[];
  following?: FollowingDocument;
  pendingRequests?: PendingRequestsDocument[];
}