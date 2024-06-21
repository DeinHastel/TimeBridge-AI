
import api from '..api/login';

export const login = async (email, password) => {
  try {
    const response = await api.post('/api-token-auth/', { email, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await api.post('/api-logout/');
    localStorage.removeItem('token');
  } catch (error) {
    throw error;
  }
};
