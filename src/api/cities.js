
import client from './client';

export const getCities = async () => {
  try {
    const response = await client.get('/api/cities');
    return response.data;
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
};

export const getCityById = async (id) => {
  try {
    const response = await client.get(`/api/cities/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching city with id ${id}:`, error);
    throw error;
  }
};
