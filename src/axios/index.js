import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.API_ENDPOINT,
  });

  instance.interceptors.response.use((response) => response, (error) => {
    console.error('axios', error);
  });

  export default instance;