import axios from 'axios';

const baseURL = 'http://192.168.0.16:8000/api';

export const userApi = axios.create({ baseURL });
