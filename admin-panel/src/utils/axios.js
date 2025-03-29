import axios from 'axios';
import { APP_BASE_URL } from 'config/constants';

axios.defaults.baseURL = APP_BASE_URL;

axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('jovialize-token');
// Add a request interceptor
axios.interceptors.request.use(
    (config) => {
      // Do something before request is sent
      window.document.getElementById('page-loader').style.display = 'block';
      config.headers.Authorization = sessionStorage.getItem('jovialize-token');
      return config;
    },
    (error) => {
      // Do something with request error
      window.document.getElementById('page-loader').style.display = 'none';
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
axios.interceptors.response.use(
    (response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      window.document.getElementById('page-loader').style.display = 'none';
      return response;
    },
    (error) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      window.document.getElementById('page-loader').style.display = 'none';
      return Promise.reject(error);
    }
  );