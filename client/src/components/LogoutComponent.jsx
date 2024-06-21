import React from 'react';
import { logout } from '../utils/auth';

const LogoutComponent = () => {
  const handleLogout = async () => {
    await logout();
    window.location.href = '/login'; // Redirigir a la página de login
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutComponent;