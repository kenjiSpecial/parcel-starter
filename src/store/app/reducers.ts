import { AppState, AppActionType, AppActions, IPage } from './types';
import { Action } from 'redux';
import { INCREMENT } from '../../utils/constants';

const initialState: AppState = {
	isFetchData: false,
	pageData: [],
	pageNum: null,
	scroll: null,
	isDebug: false
};

const app = (state: AppState = initialState, action: AppActions): AppState => {
	switch (action.type) {
		case AppActionType.START_LOAD:
			return { ...state, isFetchData: true };
		case AppActionType.LOADED:
			return { ...state, isFetchData: false };
		case AppActionType.UPDATE_PAGE_DATA:
			return { ...state, pageData: action.pageData };
		case AppActionType.SCROLL:
			let scroll;
			if (state.scroll == null) {
				scroll = action.scroll;
			} else {
				scroll =
					(state.scroll as number) +
					(action.scroll - (state.scroll as number)) * INCREMENT;
			}
			return { ...state, scroll: scroll };
		case AppActionType.UPDATE_PAGE:
			return { ...state, pageNum: action.page };
		case AppActionType.UPDATE_DEBUG:
			return { ...state, isDebug: action.debug };
		default:
			return state;
	}
};

export default app;
