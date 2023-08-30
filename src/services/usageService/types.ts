type UserUsageService = {
  users: UserService;
  usageHistory: UsageHistoryService;
};

// USER SERVICE
type UserData = {
  bggUserId: number;
  username: string;
  createdAt: string;
};

type UserToAdd = Pick<UserData, "bggUserId" | "username">;

type UserService = {
  add: (user: UserToAdd) => Promise<UserData | undefined>;
  getAll: () => Promise<UserData[]>;
  getByUserId: (bggUserId: number) => Promise<UserData | undefined>;
  getByUsername: (username: string) => Promise<UserData>;
  getByCreatedDate: (
    startDate: string,
    endDate?: string
  ) => Promise<UserData[]>;
};

// USAGE HISTORY SERVICE
type UsageData = {
  bggUserId: number;
  page: string;
  createdAt: string;
  user: UserData;
};

type UsageHistoryService = {
  add: (
    userId: number,
    page: string,
    uniqueId: string
  ) => Promise<UserData | undefined>;
  getAll: () => Promise<UsageData[]>;
  getById: (docId: string) => Promise<UsageData>;
};

export type {
  UserUsageService,
  UsageHistoryService,
  UsageData,
  UserData,
  UserToAdd,
  UserService,
};
