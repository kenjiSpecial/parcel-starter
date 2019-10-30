import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

export interface AssetsState {
	isJsonLoading: boolean;
	hasErrored: boolean;
	data: IData;
}

export interface IData {
	chapters: IChapter[];
}

export interface IChapter {
	ch: number;
	sections: ISection[];
}

export interface ISection {
	section: number;
	text: string;
	type: string;
}

export enum AssetsActionType {
	IS_LOADING = 'IS_LOADING',
	HAS_ERRORED = 'HAS_ERRORED',
	FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS'
}

export interface IsLoadingAction extends Action {
	type: AssetsActionType.IS_LOADING;
	isLoading: boolean;
}
export interface HasLoadedAction extends Action {
	type: AssetsActionType.HAS_ERRORED;
	hasErrored: boolean;
}

export interface FetchDataSuccessAction extends Action {
	type: AssetsActionType.FETCH_DATA_SUCCESS;
	data: IData;
}

export type DispatchAction<T = void> = ThunkAction<Promise<T>, {}, void, Action>;

export type AssetsActions = IsLoadingAction | HasLoadedAction | FetchDataSuccessAction;
