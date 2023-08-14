type UsageService = {
  users: UserService;
};

type UserData = {
  bggUserId: number;
  username: string;
  createdAt: string;
};

type UserToAdd = Pick<UserData, "bggUserId" | "username">;

type UserService = {
  add: (user: UserToAdd) => Promise<string | undefined>;
  getAll: () => Promise<UserData[]>;
  getByUserId: (bggUserId: number) => Promise<UserData>;
  getByUsername: (username: string) => Promise<UserData>;
  getByCreatedDate: (
    startDate: string,
    endDate?: string
  ) => Promise<UserData[]>;
};

export type { UsageService, UserData, UserToAdd, UserService };
