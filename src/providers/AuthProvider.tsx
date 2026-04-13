import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { AuthContext } from "../contexts/AuthContext";
import type { AuthContextType } from "../types/types";
import { useEffect, useState, type ReactNode } from "react";
import { auth } from "../firebase/firebase";
import api from "../services/axios";

// ✅ FIXED ROLE TYPE
type Role = "user" | "tutor" | "admin" | null;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role>(null);
  const [jwt, setJwt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // ---- AUTH STATE LISTENER ----
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);

      if (firebaseUser) {
        try {
          // 🔑 Get Firebase ID Token
          const firebaseToken = await firebaseUser.getIdToken();
          // ✅ GET ROLE FROM LOCAL STORAGE
          const pendingRole = localStorage.getItem("pendingRole");

          // 📡 Send to backend
          const res = await api.post(
            "/v1/auth/firebase",
            {
              idToken: firebaseToken,
              roleChosen: pendingRole || "user",
            },
            {
              meta: {
                skipAuth: true,
              },
            },
          );

          const data = res.data;

          // 💾 Store everything
          setUser(data.user);
          setFirebaseUser(firebaseUser);
          setJwt(data.token);
          setRole(data.user.role);

          localStorage.setItem("jwt", data.token);
          localStorage.setItem("role", data.user.role);

          // ✅ CLEANUP (VERY IMPORTANT)
          if (pendingRole) {
            localStorage.removeItem("pendingRole");
          }
        } catch (err) {
          console.error("Auth sync error:", err);
          setUser(null);
          setFirebaseUser(null);
          setJwt(null);
          setRole(null);
          await signOut(auth);
        } finally {
          localStorage.removeItem("pendingRole");
        }
      } else {
        // 🚪 Logged out
        setUser(null);
        setFirebaseUser(null);
        setJwt(null);
        setRole(null);

        localStorage.removeItem("jwt");
        localStorage.removeItem("role");
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // ---- METHODS ----

  // ✅ SAVE ROLE BEFORE SIGNUP
  const signup = async (
    email: string,
    password: string,
    roleChosen: "user" | "tutor",
  ) => {
    localStorage.setItem("pendingRole", roleChosen);
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const googleProvider = new GoogleAuthProvider();

  const loginWithGoogle = async () => {
    // ✅ ensure Google always becomes student
    localStorage.setItem("pendingRole", "user");
    await signInWithPopup(auth, googleProvider);
  };

  const value: AuthContextType = {
    user,
    firebaseUser,
    role,
    jwt,
    loading,
    signup,
    login,
    logout,
    loginWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
