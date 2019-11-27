import {
	AppActionType,
	startLoadAction,
	LoadedAction,
	UpdatePageDataAction,
	UpdatePageAction,
	UpdateScrollAction,
	IPage
} from './types';

export const startLoadHandler = (): startLoadAction => ({
	type: AppActionType.START_LOAD
});

export const loadedHandler = (): LoadedAction => ({
	type: AppActionType.LOADED
});

export const updatePagePositionHandler = (pageData: IPage[]): UpdatePageDataAction => ({
	type: AppActionType.UPDATE_PAGE_DATA,
	pageData: pageData
});

export const updatePageHandler = (page: number): UpdatePageAction => ({
	type: AppActionType.UPDATE_PAGE,
	page: page
});

export const updateScrollHandler = (scroll: number): UpdateScrollAction => ({
	type: AppActionType.SCROLL,
	scroll: scroll
});
