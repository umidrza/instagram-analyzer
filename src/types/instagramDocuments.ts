export interface InstagramStringData {
  href: string;
  value: string;
  timestamp: number;
}

export interface InstagramFollowerDocument {
  string_list_data: InstagramStringData[];
}

export interface InstagramFollowingEntry {
  string_list_data: InstagramStringData[];
  title: string;
}

export interface InstagramLabelValue {
  label: string;
  value: string;
}

export interface InstagramPendingRequestDocument {
  timestamp: number;
  label_values: InstagramLabelValue[];
}

export interface InstagramFollowingDocument {
  relationships_following: InstagramFollowingEntry[];
}

export interface InstagramDocuments {
  followers: InstagramFollowerDocument[];
  following?: InstagramFollowingDocument;
  pendingRequests?: InstagramPendingRequestDocument[];
}
