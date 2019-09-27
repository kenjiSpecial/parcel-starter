import {
	Action,
	getModule,
	Module,
	Mutation,
	MutationAction,
	VuexModule
} from 'vuex-module-decorators';
import { Firebase } from '../../firebase/firebase';
import { store } from '../store';

export interface ICounterState {
	counter: number;
}
@Module({ dynamic: true, store, name: 'counter', namespaced: true })
class Counter extends VuexModule implements ICounterState {
	// state
	public counter: number = 0;

	@Action({})
	public increment() {
		this.setCounter(this.counter + 1);
	}
	@Action({})
	public decrement() {
		this.setCounter(this.counter - 1);
	}

	@Action({})
	public setValue(value: number) {
		this.setCounter(value);
	}

	@Mutation
	private setCounter(num: number) {
		this.counter = num;

		const firebase = Firebase.GET_INSTANCE();
		firebase.updateCount(this.counter);
	}
}

export const counterModule = getModule(Counter);
