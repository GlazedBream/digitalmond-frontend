import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as authApi from '../api/auth';
import client from '../api/client';
import { dummyUser } from '../data/users';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    isAuthenticated: false,
    isLoading: true,
    user: dummyUser.user, // 더미 유저 정보로 초기화
  });

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      const mockToken = process.env.MOCK_AUTH_TOKEN;

      if (mockToken) {
        client.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;
        setAuthState({
          token: mockToken,
          isAuthenticated: true,
          isLoading: false,
          user: { ...dummyUser.user, city_id: dummyUser.user.city_id }, // 더미 유저 정보 사용
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
        user = await authApi.getMe();
      } else {
        user = { ...dummyUser.user, city_id: dummyUser.user.city_id }; // 더미 유저 정보 사용
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
      await authApi.logout();
    } catch (error) {
      console.error("Error calling logout API:", error);
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

  const updateUserPoint = async (amount) => {
    setAuthState(prevState => {
      const updatedUser = {
        ...prevState.user,
        point: (prevState.user.point || 0) + amount,
      };
      return { ...prevState, user: updatedUser };
    });
  };

  const updateUserCityId = async (cityId) => {
    setAuthState(prevState => {
      const updatedUser = {
        ...prevState.user,
        city_id: cityId,
      };
      return { ...prevState, user: updatedUser };
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout, updateUserPoint, updateUserCityId }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
