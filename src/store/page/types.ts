import { Action } from 'redux';

export interface PageState extends IPage {
	pageData: IPageData;
}

export interface IPage {
	ch: number;
	section: number;
}

export interface IPageData {
	ch: number;
	section: number[];
}

export enum PageActionType {
	UPDATE_PAGE = 'updatePage',
	SET_PAGE_DATA = 'setPageData',
	INCREMENT = 'increment',
	DECREMENT = 'decrement'
}

export interface SetPageDataAction extends Action {
	type: PageActionType.SET_PAGE_DATA;
	data: IPageData;
}

export interface UpdatePageAction extends Action {
	type: PageActionType.UPDATE_PAGE;
	data: IPage;
}

export interface IncrementAction extends Action {
	type: PageActionType.INCREMENT;
}

export interface DecrementAction extends Action {
	type: PageActionType.DECREMENT;
}

export type PageActions = SetPageDataAction | UpdatePageAction | IncrementAction | DecrementAction;
