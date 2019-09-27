import firebase from 'firebase/app';
import 'firebase/database';
import { counterModule } from '../store/modules/couter';
import store from '../store/store';
import { firebaseConfig } from './config';

export class Firebase {
	private static instance: Firebase;
	private database: firebase.database.Database;
	private counter: firebase.database.Reference;
	public static GET_INSTANCE(): Firebase {
		if (Firebase.instance === undefined) {
			Firebase.instance = new Firebase();
		}

		return Firebase.instance;
	}

	public init() {
		firebase.initializeApp(firebaseConfig);
	}

	public initDatabase() {
		this.database = firebase.database();
		this.counter = this.database.ref('counter');

		this.counter.on('value', snapshot => {
			const value = snapshot.val();

			if (value) {
				counterModule.setValue(value as number);
			}
		});
	}

	public updateCount(value: Number) {
		const updates = {
			'/counter': value
		};

		// tslint:disable-next-line: no-floating-promises
		this.database.ref().update(updates);
	}
}
