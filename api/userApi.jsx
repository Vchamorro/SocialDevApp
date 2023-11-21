import axios from 'axios';

const baseURL = 'http://10.0.2.2:8000/api';

export const userApi = axios.create({baseURL});
