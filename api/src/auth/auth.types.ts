export type OAuthUser = {
  email: string;
  avatar: {
    url?: string;
  };
  username?: string;
  firstName?: string;
  lastName?: string;
  verified?: boolean;
};
