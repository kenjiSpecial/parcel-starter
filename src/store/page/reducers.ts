import { PageState, PageActions, PageActionType } from './types';
// import { Action } from 'redux';

const initialState: PageState = {
	ch: 0,
	section: 0,
	pageData: {
		ch: 0,
		section: []
	}
};

export const page = (state: PageState = initialState, action: PageActions): PageState => {
	if (action.type === PageActionType.UPDATE_PAGE) {
		return { ...state, ch: action.data.ch, section: action.data.section };
	} else if (action.type === PageActionType.SET_PAGE_DATA) {
		return { ...state, pageData: { ch: action.data.ch, section: action.data.section } };
	} else if (action.type === PageActionType.INCREMENT) {
		let ch = state.ch;
		let section = state.section + 1;

		if (section >= state.pageData.section[ch]) {
			ch = ch + 1;
			section = 0;

			if (ch >= state.pageData.ch) {
				ch = 0;
				section = 0;
			}
		}

		return { ...state, ch: ch, section: section };
	} else if (action.type === PageActionType.DECREMENT) {
		let ch = state.ch;
		let section = state.section - 1;

		if (section < 0) {
			ch = ch - 1;
			section = state.pageData.section[ch] - 1;

			if (ch < 0) {
				ch = state.pageData.ch - 1;
				section = state.pageData.section[ch] - 1;
			}
		}

		return { ...state, ch: ch, section: section };
	} else {
		return state;
	}
};
