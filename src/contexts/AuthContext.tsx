import { createContext } from "react";
import type { AuthContextType } from "../types/types.ts";


export const AuthContext = createContext<AuthContextType | undefined>(undefined);