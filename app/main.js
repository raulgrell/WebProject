import Vue from 'vue';

import App from './App';
import router from './router';

import axios from 'axios';

axios.interceptors.request.use(function (config) {
  const token = window.localStorage.getItem('feathers-jwt');

  if (token != null) {
    config.headers['Accept'] = `application/json`;
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
    config.headers['Authorization'] = `Bearer $ {token}`;
  }

  return config;
}, function (err) {
  return Promise.reject(err);
});

new Vue({
  el: '#app',
  router,
  render: h => h(App),
}); 