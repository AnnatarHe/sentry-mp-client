export interface Status {
  id: string;
  name: string;
}

export interface Avatar {
  avatarUuid?: any;
  avatarType: string;
}

export interface FetchAllOrganizationsResponse {
  status: Status;
  require2FA: boolean;
  avatar: Avatar;
  features: string[];
  name: string;
  dateCreated: Date;
  id: string;
  isEarlyAdopter: boolean;
  slug: string;
}

export interface Avatar {
  avatarType: string;
  avatarUuid?: any;
}

export interface Status {
  id: string;
  name: string;
}

export interface Organization {
  avatar: Avatar;
  dateCreated: Date;
  id: string;
  isEarlyAdopter: boolean;
  name: string;
  require2FA: boolean;
  slug: string;
  status: Status;
}

export interface SentryProject {
  avatar: Avatar;
  color: string;
  dateCreated: Date;
  features: string[];
  firstEvent?: any;
  hasAccess: boolean;
  id: string;
  isBookmarked: boolean;
  isInternal: boolean;
  isMember: boolean;
  isPublic: boolean;
  name: string;
  organization: Organization;
  platform?: any;
  slug: string;
  status: string;
}


export interface IssueMetadata {
  filename: string;
  type: string;
  value: string;
  title: string;
}

export interface ProjectBrief {
  id: string;
  name: string;
  slug: string;
}

export interface Stats {
  '24h': number[][];
}

export interface StatusDetails {
}

export interface SentryIssue {
  annotations: any[];
  assignedTo?: any;
  count: string;
  culprit: string;
  firstSeen: Date;
  hasSeen: boolean;
  id: string;
  isBookmarked: boolean;
  isPublic: boolean;
  isSubscribed: boolean;
  lastSeen: Date;
  level: string;
  logger?: any;
  metadata: IssueMetadata;
  numComments: number;
  permalink: string;
  project: ProjectBrief;
  shareId?: any;
  shortId: string;
  stats: Stats;
  status: string;
  statusDetails: StatusDetails;
  subscriptionDetails?: any;
  title: string;
  type: string;
  userCount: number;
}
