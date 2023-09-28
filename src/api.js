import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.spoonacular.com',
  params: {
    apiKey: 'c1573df744bd4d0f8e0571ffddef0f5e',
  },
});

export default api;