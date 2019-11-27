import { Action } from 'redux';

export interface AppState {
	isFetchData: boolean;
	pageData: IPage[];
	pageNum: number | null;
	scroll: number | null;
}

export enum AppActionType {
	START_LOAD = 'START_LOAD',
	LOADED = 'LOADED',
	UPDATE_PAGE_DATA = 'UPDATE_PAGE_DATA',
	UPDATE_PAGE = 'UPDATE_PAGE',
	SCROLL = 'SCROLL'
}

export interface IPage {
	page: number;
	start: number;
	end: number;
}

export interface LoadedAction extends Action {
	type: AppActionType.LOADED;
}

export interface startLoadAction extends Action {
	type: AppActionType.START_LOAD;
}

export interface UpdatePageDataAction extends Action {
	type: AppActionType.UPDATE_PAGE_DATA;
	pageData: IPage[];
}

export interface UpdatePageAction extends Action {
	type: AppActionType.UPDATE_PAGE;
	page: number;
}

export interface UpdateScrollAction extends Action {
	type: AppActionType.SCROLL;
	scroll: number;
}

export type AppActions =
	| LoadedAction
	| startLoadAction
	| UpdatePageDataAction
	| UpdatePageAction
	| UpdateScrollAction;
