import axios from 'axios';

const baseURL = 'http://192.168.0.11:8000/api';

export const userApi = axios.create({ baseURL });
