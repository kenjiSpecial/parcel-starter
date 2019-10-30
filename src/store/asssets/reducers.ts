import { AssetsState, IData, IChapter, AssetsActionType, AssetsActions } from './types';
import { Action } from 'redux';

const initialState: AssetsState = {
	isJsonLoading: false,
	hasErrored: false,
	data: { chapters: [] } as IData
};

export const assets = (state: AssetsState = initialState, action: AssetsActions): AssetsState => {
	// console.log(state, action);

	if (action.type === AssetsActionType.IS_LOADING) {
		return { ...state, isJsonLoading: true };
	} else if (action.type === AssetsActionType.FETCH_DATA_SUCCESS) {
		return { ...state, isJsonLoading: false, data: action.data };
	} else {
		return state;
	}
};
