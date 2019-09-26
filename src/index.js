import Vue from 'vue';
import App from './CounterApp.vue';
import store from './store/store';
// const firebase = require('./firebase/firebase');
import firebase from './firebase/firebase';
Vue.config.productionTip = false;
firebase.init();

new Vue({
	store,
	el: '#app',
	render: h => h(App)
});
