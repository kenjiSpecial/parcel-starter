import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
// import logger from 'redux-logger';

import app from './app/reducers';
import { AppState } from './app';

const reducer = combineReducers({
	app
});

export interface State {
	app: AppState;
}

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (initialState?: State) => createStore(reducer, initialState);
// createStore(reducer, initialState, composeEnhancers(applyMiddleware(logger)));

export const store = configureStore();
