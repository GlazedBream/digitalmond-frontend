import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as authApi from '../api/auth';
import client from '../api/client';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    isAuthenticated: false,
    isLoading: true,
    user: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      const mockToken = process.env.MOCK_AUTH_TOKEN;

      if (mockToken) {
        // If MOCK_AUTH_TOKEN is set, prioritize it for bypass
        client.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;
        setAuthState({
          token: mockToken,
          isAuthenticated: true,
          isLoading: false,
          user: { id: 'mockUser', email: 'mock@example.com', firstName: 'Mock', lastName: 'User' }, // Dummy user for mock
        });
        console.log("Loaded MOCK_AUTH_TOKEN for initial bypass.");
      } else if (storedToken) {
        client.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        try {
          const user = await authApi.getMe();
          setAuthState({
            token: storedToken,
            isAuthenticated: true,
            isLoading: false,
            user: user,
          });
        } catch (error) {
          // If fetching user fails, clear token and treat as unauthenticated
          await AsyncStorage.removeItem('token');
          setAuthState({
            token: null,
            isAuthenticated: false,
            isLoading: false,
            user: null,
          });
          console.error("Failed to fetch user with stored token, logging out.", error);
        }
      } else {
        setAuthState({
          token: null,
          isAuthenticated: false,
          isLoading: false,
          user: null,
        });
      }
    };

    loadToken();
  }, []);

  const login = async (email, password) => {
    try {
      let token;
      const mockToken = process.env.MOCK_AUTH_TOKEN;

      if (mockToken) {
        token = mockToken;
        console.log("Using MOCK_AUTH_TOKEN for login bypass.");
      } else {
        token = await authApi.login(email, password);
      }

      await AsyncStorage.setItem('token', token);
      client.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      let user = null;
      if (!mockToken) {
        // Only fetch user data if not using mock bypass token
        user = await authApi.getMe();
      }

      setAuthState({
        token: token,
        isAuthenticated: true,
        isLoading: false,
        user: user,
      });
    } catch (error) {
      console.error("Login failed:", error);
      return Promise.reject(error);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout(); // Call logout API
    } catch (error) {
      console.error("Error calling logout API:", error);
      // Continue with local logout even if API call fails
    }
    await AsyncStorage.removeItem('token');
    setAuthState({
      token: null,
      isAuthenticated: false,
      isLoading: false,
      user: null,
    });
    delete client.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
