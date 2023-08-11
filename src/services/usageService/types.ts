type UsageService = {
  users: {
    getAll: () => Promise<UserData[]>;
    getByUserId: (bggUserId: number) => Promise<UserData>;
    getByUsername: (username: string) => Promise<UserData>;
    getByCreatedDate: (
      startDate: string,
      endDate?: string
    ) => Promise<UserData[]>;
  };
};

type UserData = {
  id: string;
  bggUserId: string;
  username: string;
  createdAt: string;
};

export type { UsageService, UserData };
