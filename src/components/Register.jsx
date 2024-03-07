import React, { useState } from 'react';
import api from './../api';

const Register = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submit action
        try {
            // Make a POST request to the registration endpoint
            const response = await api.post('/users/register/', userData);
            console.log('Registration successful:', response.data);
            // Optionally redirect the user to the login page or homepage after successful registration
            // For example, using react-router-dom's useHistory hook: history.push('/login');
        }  catch (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.error('Registration error:', error.response.data);
              // Handle errors, such as displaying a notification or error message to the user
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.error('No response received:', error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.error('Error:', error.message);
            }
          }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                <h3 className="text-2xl font-bold text-center">Create an account</h3>
                <form onSubmit={handleSubmit}> {/* Add the onSubmit handler */}
                    <div className="mt-4">
                        <div>
                            <label className="block" htmlFor="username">Username</label>
                            <input
                                type="text"
                                name="username" // Add the 'name' attribute
                                placeholder="Username"
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                id="username"
                                value={userData.username} // Add the 'value' attribute
                                onChange={handleChange} // Add the onChange handler
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block" htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email" // Add the 'name' attribute
                                placeholder="Email"
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                id="email"
                                value={userData.email} // Add the 'value' attribute
                                onChange={handleChange} // Add the onChange handler
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block" htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password" // Add the 'name' attribute
                                placeholder="Password"
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                id="password"
                                value={userData.password} // Add the 'value' attribute
                                onChange={handleChange} // Add the onChange handler
                            />
                        </div>
                        <div className="flex items-baseline justify-between">
                            <button type="submit" className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Register</button>
                            <a href="/login" className="text-sm text-blue-600 hover:underline">Already have an account?</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
