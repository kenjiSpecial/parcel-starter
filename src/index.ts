import firebase from 'firebase';
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

firebase.initializeApp(config);

new Vue({
	el: '#app',
	render: h => h(App)
});
