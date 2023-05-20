import { $authHost, $host } from './axios';
import jwt_decode from 'jwt-decode';

export const registration = async (email: string, password: string) => {
   const { data } = await $host.post('api/user/register', { email, password, role: 'ADMIN' });
   localStorage.setItem('token', data);
   return jwt_decode(data);
};

export const login = async (email: string, password: string) => {
   const { data } = await $host.post('api/user/login', { email, password });
   localStorage.setItem('token', data);
   return jwt_decode(data);
};

export const check = async () => {
   const { data } = await $authHost.get('api/user/auth');
   localStorage.setItem('token', data);
   return jwt_decode(data);
};
