import api from "./axios.ts";
import type { FirebaseAuthRequest, AuthResponse } from "../types/auth";

export const sendTokenToBackend = async (
  payload: FirebaseAuthRequest,
): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>("/auth/firebase", payload, {
    meta: {
      skipAuth: true, // Flag
    },
  });

  localStorage.setItem("jwt", res.data.token);

  return res.data;
};
