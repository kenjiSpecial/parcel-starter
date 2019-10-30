import {
	AssetsActions,
	AssetsActionType,
	IsLoadingAction,
	HasLoadedAction,
	DispatchAction,
	AssetsState,
	IData,
	FetchDataSuccessAction
} from './types';
import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { AnyAction, Dispatch, Action } from 'redux';

export const setJsonLoad = (isLoading: boolean): IsLoadingAction => ({
	type: AssetsActionType.IS_LOADING,
	isLoading: isLoading
});

export const hasErrored = (hasErrored: boolean): HasLoadedAction => ({
	type: AssetsActionType.HAS_ERRORED,
	hasErrored: hasErrored
});

export const fetchDataSuccess = (data: IData): FetchDataSuccessAction => ({
	type: AssetsActionType.FETCH_DATA_SUCCESS,
	data: data
});

export function getJson(): DispatchAction {
	return async dispatch => {
		const response = await fetch('assets/data.json');
		const myJson = await response.json();
		console.log(dispatch);
		dispatch(hasErrored(true));
	};
}

export const getData = (): ThunkAction<void, AssetsState, undefined, Action> => async (
	dispatch: Dispatch<Action>
) => {
	// 非同期な関数を使える
	// dispatch(startFetch());
	dispatch(setJsonLoad(true));

	axios
		.get('assets/data.json')
		.then(function(response) {
			dispatch(fetchDataSuccess(response.data));
		})
		.catch(function(error) {
			// console.log(error);
		});
};
