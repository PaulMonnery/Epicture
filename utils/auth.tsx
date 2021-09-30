import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext, useEffect, useState } from 'react';

export const { AUTH_CLIENT_ID } = process.env;

export async function getAuthToken(): Promise<string | null> {
  return SecureStore.getItemAsync(AUTH_CLIENT_ID || '?');
}

export async function getUsername(): Promise<string | null> {
  return SecureStore.getItemAsync('username');
}

export function useAuthToken(): [string | null, (token: string) => void, { loading: boolean }] {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getAuthToken().then((newToken) => {
      if (newToken) {
        setToken(newToken);
      }
      setLoading(false);
    });
  }, []);

  return [token, setToken, { loading }];
}

export interface ReducerState {
  isLoading: boolean;
  isSignout: boolean;
  userToken: string | null;
  username: string | null;
}

export type AuthContextInterface = {
  signIn: (token: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
  state: ReducerState;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextInterface | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [state, setState] = useState<ReducerState>({
    isLoading: true,
    isSignout: false,
    userToken: null,
    username: null,
  });

  useEffect(() => {
    const bootstrapAsync = async (): Promise<void> => {
      let userToken;
      let username;

      try {
        userToken = await SecureStore.getItemAsync(AUTH_CLIENT_ID!);
        username = await SecureStore.getItemAsync('username');
      } catch (e) {
        console.error(e);
      }
      if (userToken && username) {
        setState({
          ...state,
          userToken,
          isLoading: false,
          username,
        });
      }
    };

    bootstrapAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authContext = {
    signIn: async (token: string, username: string): Promise<void> => {
      await SecureStore.setItemAsync(AUTH_CLIENT_ID!, token);
      await SecureStore.setItemAsync('username', username);
      setState({
        ...state,
        userToken: token,
        isLoading: false,
        username,
      });
    },
    signOut: async (): Promise<void> => {
      await SecureStore.deleteItemAsync(AUTH_CLIENT_ID!);
      setState({
        ...state,
        isSignout: true,
        userToken: null,
        username: null,
      });
    },
    state,
  };

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextInterface => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('AuthCtx must be called in AuthProvider');
  }
  return context;
};
