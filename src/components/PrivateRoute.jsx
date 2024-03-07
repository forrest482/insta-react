import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
    const isAuthenticated = localStorage.getItem('access_token'); // Check if the access token is stored in localStorage

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;

};

export default PrivateRoute;
