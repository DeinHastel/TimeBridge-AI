import { useState, useEffect } from 'react';
import api from '../api/login.api';
import {username, password} from './login'

const useAuth = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const login = async () => {
      const credentials = { username, password};
      const response = await api.login(credentials);
      setToken(response.token);
    };
    login();
  }, []);

  const authenticate = async () => {
    if (!token) {
      throw new Error('No token available');
    }
    api.defaults.headers.Authorization = `Bearer ${token}`;
  };

  return { authenticate };
};

export default useAuth;