import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://illatively-crackly-chuck.ngrok-free.dev/api/v1",
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

// Attach token to every request if available
axiosInstance.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
