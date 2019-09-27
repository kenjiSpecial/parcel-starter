import Vue from 'vue';
import App from './CounterApp.vue';
import { Firebase } from './firebase/firebase';
import { store } from './store/store';

Vue.config.productionTip = false;
const firebase = Firebase.GET_INSTANCE();
firebase.init();

new Vue({
	store,
	el: '#app',
	render: h => h(App)
});
