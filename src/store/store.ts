import Vue from 'vue';
import Vuex from 'vuex';
import { ICounterState } from './modules/couter';
Vue.use(Vuex);

export interface State {
	counter: ICounterState;
}

export const store = new Vuex.Store<State>({});
