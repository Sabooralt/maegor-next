import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      email?: string;
      username?: string;
      verified?: boolean;
    };
  }
  interface User {
    id?: string;
    email?: string;
    username?: string;
    verified?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    email?: string;
    username?: string;
    verified?: boolean;
  }
}
