import { create } from 'zustand';
import { User } from './auth.type';
import { createSelectors } from '@/lib/zustand';
import { getCookie, setCookie } from '@/lib/cookies';

type AuthState = {
  user: User | null;
  isLoggedIn: boolean;
};

type AuthActions = {
  setUser: (user: User) => void;
  setToken: (accessToken: User['token'], refreshToken: User['refresh_token']) => void;
  reset: () => void;
  hydrate: () => void;
};

const initialValues: AuthState = {
  user: null,
  isLoggedIn: false,
};

export const AUTH_COOKIE_KEYS = {
  ACCESS_TOKEN: '__khonhapho-auth-access-token',
  REFRESH_TOKEN: '__khonhapho-auth-refresh-token',
};

export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  ...initialValues,
  setUser: (user) => {
    // handle logic set user
    if (user) {
      set({ user, isLoggedIn: true });
      setCookie(AUTH_COOKIE_KEYS['ACCESS_TOKEN'], user.token);
      setCookie(AUTH_COOKIE_KEYS['REFRESH_TOKEN'], user.refresh_token);
    }
  },
  // In case refresh token
  setToken: (accessToken, refreshToken) => {
    // handle logic set token
    const currentUser = get().user;
    if (currentUser) {
      set({ user: { ...currentUser, token: accessToken, refresh_token: refreshToken } });
      setCookie(AUTH_COOKIE_KEYS['ACCESS_TOKEN'], accessToken);
      setCookie(AUTH_COOKIE_KEYS['REFRESH_TOKEN'], refreshToken);
    }
  },
  reset: () => {
    set(initialValues);
  },
  // In case reload page, call when layout component mounted
  hydrate: () => {
    const tokenFromCookies = getCookie(AUTH_COOKIE_KEYS['ACCESS_TOKEN']);
    if (tokenFromCookies) {
      // handle decoded token jwt and set to state ...

      // const user = {
      //   token: tokenFromCookies,
      //   refresh_token: getCookie(AUTH_COOKIE_KEYS['REFRESH_TOKEN']) ?? '',
      // } as User;
      // set({ user, isLoggedIn: true });
    }
  },
}));

export const authSelectors = createSelectors(useAuthStore).use;
