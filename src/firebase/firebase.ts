import firebase from 'firebase';
// import store from '../store/store';
import { firebaseConfig } from './config';

let database;
let counter;

export default {
	init: function() {
		firebase.initializeApp(firebaseConfig);
	},
	initDatabase: function() {
		database = firebase.database();
		counter = database.ref('counter');

		counter.on('value', snapshot => {
			const value = snapshot.val();

			if (value) {
				store.dispatch('setValue', value);
			}
		});
	},
	updateCount(value) {
		const updates = {};
		updates['/counter'] = value;
		database.ref().update(updates);
	}
};
