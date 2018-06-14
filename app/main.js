import Vue from 'vue';

import App from './App';
import router from './router';
import services from './services';
import store from './store';

import axios from 'axios';

import Modal from './components/common/Modal.vue';

axios.interceptors.request.use(config => {
  const token = window.localStorage.getItem('feathers-jwt');
  if (token != null) {
    config.headers['Accept'] = `application/json`;
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, err => Promise.reject(err));

Vue.use(services, store);

Vue.component('Modal', Modal);

new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
