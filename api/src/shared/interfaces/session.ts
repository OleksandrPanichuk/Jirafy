export type SessionData = {
  ookie: {
    originalMaxAge: number;
    expires: string;
    httpOnly: boolean;
    path: string;
  };
  passport: {
    user: string;
  };
};
