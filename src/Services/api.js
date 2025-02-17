import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
  baseURL: `https://dev.jackychee.com/api`,
  timeout: 50000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});


instance.interceptors.request.use(function (config) {
  let token;
  if (Cookies.get('userToken')) {
    token = JSON.parse(Cookies.get('userToken')).token;  // Ensure you're accessing the correct field
  }
  const isAuthenticated = localStorage.getItem('token');
  // console.log("isAuthenticated",isAuthenticated)


  console.log("TOKEN ====>>", token);

  if (isAuthenticated && !config.headers['Authorization']) {
    config.headers['Authorization'] = `Bearer ${isAuthenticated}`;
  }

  return config;
});

const responseBody = (response) => response.data;

const requests = {
  get: (url, body, headers) =>
    instance.get(url, body, headers).then(responseBody),

  post: (url, body) => instance.post(url, body).then(responseBody),
  uploadPosts: (url, body) =>  instance.post(url, body, {
    headers: {
      'Content-Type': 'multipart/form-data', 
    },
  }).then(responseBody),

  customPost: (url, body, token) => {
    return instance.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    }).then(responseBody);
  },

  put: (url, body,) =>
    instance.put(url, body, ).then(responseBody),

  patch: (url, body) => instance.patch(url, body).then(responseBody),

  delete: (url, body) => instance.delete(url, body).then(responseBody),
  upload: (url, formData) =>
    instance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    }).then(responseBody),
};

export default requests;
