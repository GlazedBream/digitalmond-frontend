import client from './client';

export const login = async (email, password) => {
  try {
    const response = await client.post('/api/auth/login', { email, password });
    return response.data.data.accessToken; // Updated to return accessToken
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const signup = async ({ cityId = null, email, password, password2, lastName, firstName, country, cityCode }) => {
  try {
    const response = await client.post('/api/users', {
      cityId,
      email,
      password,
      password2,
      lastName,
      firstName,
      country,
      cityCode,
    });
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const getMe = async () => {
  try {
    const response = await client.get('/api/users/me');
    return response.data.data.user;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await client.post('/api/auth/logout');
    return response.data;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};
