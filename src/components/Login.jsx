import React, { useState } from 'react';
import api from './../api';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '', // Use 'username' or 'email' depending on your backend authentication setup
    password: '',
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submit action
    try {
      // Make a POST request to the login endpoint
      const response = await api.post('/users/token/', credentials);
      console.log('Login successful:', response.data);
      localStorage.setItem('access_token', response.data.access); // Save the access token in localStorage
      localStorage.setItem('refresh_token', response.data.refresh); // Save the refresh token in localStorage
      // Optionally, redirect the user to the homepage or another page after successful login
    } catch (error) {
      console.error('Login error:', error.response.data);
      // Handle errors, such as displaying a notification or error message to the user
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Login to your account</h3>
        <form onSubmit={handleSubmit}> {/* Add the onSubmit handler */}
          <div className="mt-4">
            <div>
              <label className="block" htmlFor="username">Username</label>
              <input
                type="text"
                name="username" // Change 'name' to 'email' if your backend uses email for login
                placeholder="Username" // Change placeholder to "Email" if using email
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                id="username"
                value={credentials.username} // Bind input value to the component's state
                onChange={handleChange} // Add the onChange handler
              />
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                id="password"
                value={credentials.password} // Bind input value to the component's state
                onChange={handleChange} // Add the onChange handler
              />
            </div>
            <div className="flex items-baseline justify-between">
              <button type="submit" className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Login</button>
              <a href="/register" className="text-sm text-blue-600 hover:underline">Don't have an account?</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
