import axios from 'axios';

const baseURL = 'http://192.168.1.130:8000/api';

export const userApi = axios.create({baseURL});
