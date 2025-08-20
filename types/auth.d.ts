export type roleUserType = "user" | "admin" | "super_admin";

export type User = {
  id: string;
  email: string | null;
  name: string | null;
  role: roleUserType;
  phone: string | null;
  image: string | null;
  emailVerified: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

declare module "next-auth" {
  interface User {
    id: string;
    email: string | null;
    name: string | null;
    role: roleUserType;
    phone: string | null;
    image: string | null;
    emailVerified: Date | null;
    createdAt: Date;
    updatedAt: Date;
  }

  interface Session {
    user: {
      id: string;
      email: string | null;
      name: string | null;
      role: roleUserType;
      image: string | null;
      emailVerified: Date | null;
      createdAt: Date;
      updatedAt: Date;
      phone: string | null;
    };
    token: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      id: any;
      sub?: string;
      email?: string | null;
      name?: string | null;
      picture?: string | null;
      role?: roleUserType;
      emailVerified?: Date | null;
      createdAt?: Date;
      updatedAt?: Date;
      phone?: string | null;
    };
  }
}
