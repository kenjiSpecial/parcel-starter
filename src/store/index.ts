import { applyMiddleware, combineReducers, compose, createStore, Store } from 'redux';
import logger from 'redux-logger';
import thunk, { ThunkDispatch } from 'redux-thunk';

import { page } from './page/reducers';
import { PageState } from './page/types';

import { assets } from './asssets/reducers';
import { AssetsState } from './asssets';

const reducer = combineReducers({
	page,
	assets
});

export interface State {
	page: PageState;
	assets: AssetsState;
}

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleWares = [thunk, logger];
// const configureStore = (initialState?: State) =>
// 	createStore(reducer, initialState, composeEnhancers(applyMiddleware(...middleWares)));

function configureStore(initialState?: State) {
	const middleware = applyMiddleware(thunk, logger);

	// const store: Store<Redux.Store.Definition> = createStore(reducer, middleware);
	const store = createStore(
		reducer,
		initialState,
		composeEnhancers(applyMiddleware(...middleWares))
	);

	return store;
}

export const store = configureStore();
