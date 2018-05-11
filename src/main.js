// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import firebase from 'firebase';
import store from '@/store';
import Vue from 'vue';
import App from './App';
import router from './router';

Vue.use(Vuetify);

const config = {
  apiKey: 'AIzaSyBk3K4k3wsP6SnzByEfjAR6uzGsqR-Kb24',
  authDomain: 'fir-vue-2f19f.firebaseapp.com',
  databaseURL: 'https://fir-vue-2f19f.firebaseio.com',
  projectId: 'fir-vue-2f19f',
  storageBucket: 'fir-vue-2f19f.appspot.com',
  messagingSenderId: '179796575096',
};

firebase.initializeApp(config);

Vue.config.productionTip = false;

/* eslint-disable no-new */
const unsubscribe = firebase.auth()
.onAuthStateChanged((firebaseUser) => {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    created () {
      if (firebaseUser) {
        store.dispatch('autoSignIn', firebaseUser)
      }
    }
  })
  unsubscribe()
})
