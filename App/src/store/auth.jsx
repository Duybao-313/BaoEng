import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import {
  login as apiLogin,
  logout as apiLogout,
} from "../api";
import { clearAccessToken, getAccessToken, setAccessToken } from "../api/token";

const AuthContext = createContext(null);

/**
 * Quan ly phien dang nhap (session) cua nguoi hoc.
 * `signIn` luu accessToken vao bo nho de `client.js` tu dong gan header.
 *
 * @param {{ children: import('react').ReactNode }} props
 */
export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);

  const signIn = useCallback(async ({ username, password }) => {
    const data = await apiLogin({ username, password });
    const next = { accessToken: data.accessToken, user: data.user };
    setAccessToken(data.accessToken);
    setSession(next);
    return next;
  }, []);

  const signOut = useCallback(async () => {
    if (getAccessToken()) {
      try {
        await apiLogout();
      } catch {
        // Van dang xuat o client ke ca khi backend loi.
      }
    }
    clearAccessToken();
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({ session, signIn, signOut }),
    [session, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Doc phien dang nhap hien tai.
 * @returns {{ session: { accessToken: string, user: object } | null, signIn: Function, signOut: Function }}
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth phai duoc dung ben trong <AuthProvider>.");
  }
  return context;
}
