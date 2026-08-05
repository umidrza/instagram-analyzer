interface InstagramStringData {
  href: string;
  value: string;
  timestamp: number;
}

interface InstagramEntry {
  string_list_data: InstagramStringData[];
}

interface FollowingEntry {
  string_list_data: InstagramStringData[];
  title: string;
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
  relationships_following: FollowingEntry[];
}


export interface InstagramDocuments {
  followers: InstagramEntry[];
  following?: FollowingDocument;
  pendingRequests?: PendingRequestsDocument[];
}