import {
	SetPageDataAction,
	IPage,
	PageActionType,
	UpdatePageAction,
	IPageData,
	IncrementAction,
	DecrementAction
} from './types';

export const setPageData = (data: IPageData): SetPageDataAction => ({
	type: PageActionType.SET_PAGE_DATA,
	data: data
});

export const updatePage = (data: IPage): UpdatePageAction => ({
	type: PageActionType.UPDATE_PAGE,
	data: data
});

export const increment = (): IncrementAction => ({
	type: PageActionType.INCREMENT
});

export const decrement = (): DecrementAction => ({
	type: PageActionType.DECREMENT
});
