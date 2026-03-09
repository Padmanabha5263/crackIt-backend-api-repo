import "express-session";

declare module "express-session" {
  interface SessionData {
    isLoggedIn: boolean;
    user: {
      id: string;
      name: string;
      email: string;
      usertype: string;
    };
  }
}
