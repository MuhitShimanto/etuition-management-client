import type { User } from "firebase/auth";

export const Role = {
  ADMIN: "admin",
  TUTOR: "tutor",
  USER: "user",
} as const

export type Role = (typeof Role)[keyof typeof Role];

type BackendUser = {
  avatar: string;
  createdAt: Date;
  email: string;
  firebaseUid: string;
  name: string;
  role: "user" | "tutor" | "admin";
  status: "active" | "suspended";
  updatedAt: Date;
};

export interface AuthContextType {
  user: BackendUser | null;
  firebaseUser: User | null;
  role: Role | null;
  jwt: string | null;
  loading: boolean;

  signup: (email: string, password: string, roleChosen: Exclude<Role, "admin">) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
}