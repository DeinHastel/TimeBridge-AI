// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, children }) => {
    if (!isLoggedIn) {
        return <Navigate to="/login" replace state={{ error: 'Debe iniciar sesión para acceder a esta página.' }} />;
    }

    return children;
};

export default ProtectedRoute;