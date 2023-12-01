import axios from 'axios';

const baseURL = 'http://192.168.0.13:8000/api';

export const userApi = axios.create({ baseURL });
