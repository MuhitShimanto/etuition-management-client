export type UserRole = "user" | "tutor";

export interface FirebaseAuthRequest {
  idToken: string;
  role?: UserRole;
}

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: AuthUser;
}