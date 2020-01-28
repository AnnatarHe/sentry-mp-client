export interface Status {
  id: string;
  name: string;
}

export interface Stats {
  '30d'?: number[][];
  '24h': number[][];
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

export interface Tag {
  totalValues: number;
  name: string;
  key: string;
}

export interface Project {
  platform: string;
  slug: string;
  id: string;
  name: string;
}

export interface Activity {
  data: {};
  dateCreated: Date;
  type: string;
  id: string;
  user?: any;
}

export interface StatusDetails {
}

export interface SentryIssueDetail {
  seenBy: any[];
  platform: string;
  pluginIssues: any[];
  lastSeen: Date;
  userReportCount: number;
  numComments: number;
  userCount: number;
  stats: Stats;
  culprit: string;
  title: string;
  id: string;
  assignedTo?: any;
  participants: any[];
  logger: string;
  type: string;
  annotations: any[];
  metadata: IssueMetadata;
  status: string;
  pluginActions: any[];
  tags: Tag[];
  subscriptionDetails?: any;
  isPublic: boolean;
  hasSeen: boolean;
  firstRelease?: any;
  shortId: string;
  shareId?: any;
  firstSeen: Date;
  count: string;
  permalink: string;
  level: string;
  isSubscribed: boolean;
  pluginContexts: any[];
  isBookmarked: boolean;
  project: Project;
  lastRelease?: any;
  activity: Activity[];
  statusDetails: StatusDetails;
}

export interface SdkUpdate {
  enables: any[];
  sdkUrl: string;
  sdkName: string;
  newSdkVersion: string;
  type: string;
}

export interface GroupingConfig {
  enhancements: string;
  id: string;
}

export interface Tag {
  value: string;
  key: string;
  _meta?: any;
  query: string;
}

export interface User {
  username?: any;
  name?: any;
  ip_address: string;
  email?: any;
  data?: any;
  id?: any;
}

export interface Frame {
  function: string;
  errors?: any;
  colNo: number;
  vars?: any;
  package?: any;
  absPath: string;
  inApp: boolean;
  lineNo: number;
  module: string;
  filename: string;
  platform?: any;
  instructionAddr?: any;
  context: any[][];
  symbolAddr?: any;
  trust?: any;
  symbol?: any;
  rawFunction?: any;
}

export interface Stacktrace {
  frames: Frame[];
  framesOmitted?: any;
  registers?: any;
  hasSystemFrames: boolean;
}

export interface Mechanism {
  type: string;
  handled: boolean;
}

export interface Value {
  stacktrace: Stacktrace;
  module?: any;
  rawStacktrace?: any;
  mechanism: Mechanism;
  threadId?: any;
  value: string;
  type: string;
}

export interface EntryData {
  values: Value[];
  excOmitted?: any;
  hasSystemFrames: boolean;
  fragment?: any;
  cookies: any[];
  inferredContentType?: any;
  env?: any;
  headers: string[][];
  url: string;
  query: any[];
  data?: any;
  method?: any;
}

export interface Entry {
  type: string;
  data: EntryData;
}

export interface Packages {
}

export interface Sdk {
  version: string;
  name: string;
}

export interface Entries {
}

export interface Tags {
}

export interface Meta {
  user?: any;
  context?: any;
  entries: Entries;
  contexts?: any;
  message?: any;
  packages?: any;
  tags: Tags;
  sdk?: any;
}

export interface Os {
  version: string;
  type: string;
  name: string;
}

export interface Browser {
  version: string;
  type: string;
  name: string;
}

export interface Contexts {
  os: Os;
  browser: Browser;
}

export interface Context {
}

export interface SentryEvent {
  eventID: string;
  dist?: any;
  userReport?: any;
  projectID: string;
  previousEventID?: any;
  message: string;
  id: string;
  size: number;
  errors: any[];
  culprit: string;
  title: string;
  sdkUpdates: SdkUpdate[];
  platform: string;
  location: string;
  nextEventID?: any;
  type: string;
  metadata: IssueMetadata;
  groupingConfig: GroupingConfig;
  crashFile?: any;
  tags: Tag[];
  dateCreated: Date;
  dateReceived: Date;
  user: User;
  entries: Entry[];
  packages: Packages;
  sdk: Sdk;
  _meta: Meta;
  contexts: Contexts;
  fingerprints: string[];
  context: Context;
  release?: any;
  groupID: string;
}
