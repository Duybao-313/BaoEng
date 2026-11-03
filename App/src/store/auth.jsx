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

const USER_STORAGE_KEY = "baoeng.user";

/** localStorage tren web; null tren native hoac khi bi chan (private mode). */
function getStorage() {
  try {
    return typeof globalThis !== "undefined" && globalThis.localStorage
      ? globalThis.localStorage
      : null;
  } catch {
    return null;
  }
}

/** @returns {object | null} */
function readStoredUser() {
  const raw = getStorage()?.getItem(USER_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/** @param {object | null} user */
function storeUser(user) {
  const storage = getStorage();
  if (!storage) return;
  try {
    if (user) storage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    else storage.removeItem(USER_STORAGE_KEY);
  } catch {
    // Bo qua loi quota/private mode.
  }
}

/**
 * Quan ly phien dang nhap (session) cua nguoi hoc.
 * `signIn` luu accessToken vao bo nho de `client.js` tu dong gan header.
 * Tren web, token + user duoc persist nen refresh trang van giu dang nhap.
 *
 * @param {{ children: import('react').ReactNode }} props
 */
export function AuthProvider({ children }) {
  // Khoi tao tu token da persist (neu co) de refresh trang khong mat phien.
  const [session, setSession] = useState(() => {
    const token = getAccessToken();
    return token ? { accessToken: token, user: readStoredUser() } : null;
  });

  const signIn = useCallback(async ({ username, password }) => {
    const data = await apiLogin({ username, password });
    const next = { accessToken: data.accessToken, user: data.user };
    setAccessToken(data.accessToken);
    storeUser(data.user);
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
    storeUser(null);
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
