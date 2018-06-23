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
  apiKey: 'AIzaSyD1my9sw_EUnSrt32j5v8bv5AeTqR0F2FY',
  authDomain: 'tickets-587c9.firebaseapp.com',
  databaseURL: 'https://tickets-587c9.firebaseio.com',
  projectId: 'tickets-587c9',
  storageBucket: 'tickets-587c9.appspot.com',
  messagingSenderId: '944530947723',
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
    created() {
      if (firebaseUser) {
        store.dispatch('autoSignIn', firebaseUser);
      }
    },
  });
  unsubscribe();
});
