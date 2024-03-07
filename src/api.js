import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Your API base URL
});

async function refreshAccessToken() {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/users/token/refresh/`,
      {
        refresh: localStorage.getItem("refresh_token"), // Assuming the refresh token is stored in localStorage
      }
    );
    return response.data.access;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    // Handle error, e.g., redirect to login or show a message
    return null;
  }
}

// Response interceptor to handle token refresh logic
api.interceptors.response.use(
  (response) => response, // This means the request was successful
  async (error) => {
    const originalRequest = error.config;
    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Marking the request to avoid infinite retry loops
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        localStorage.setItem("access_token", newAccessToken); // Update the access token in localStorage
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`; // Update the authorization header
        return api(originalRequest); // Retry the original request with the new access token
      }
    }
    return Promise.reject(error); // If no new access token, reject the promise
  }
);

// Request interceptor to add the authorization header
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`; // Set the authorization header
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
