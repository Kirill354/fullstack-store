import axios from 'axios';

const $host = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
});

const $authHost = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
});

$authHost.interceptors.request.use((config) => {
   const access_token = localStorage.getItem('token');
   if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
   }
   return config;
});

export { $host, $authHost };
