// import Vue from 'vue'; // NOTE already globally available
import App from './App.vue';

// set our .env vars
window.env = {
  VIBRANT_SERVICE_ENDPOINT: "process.env.VIBRANT_SERVICE_ENDPOINT"
}

new Vue({
    el: '#vue-app',
    methods: {

    },
    components: {
      App
    }
  });
