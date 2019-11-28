import { store } from '../store';
import { updatePageHandler } from '../store/app';

export function checkScroll() {
	let prevScroll = store.getState().app.scroll;
	store.subscribe(updateScroll);

	function updateScroll() {
		const appStore = store.getState().app;
		const scrollVal = appStore.scroll;
		const pageData = appStore.pageData;
		const pageNum = appStore.pageNum;
		let curPageNum;

		if (
			prevScroll === null ||
			pageNum === null ||
			Math.abs((scrollVal as number) - prevScroll) > 0.01
		) {
			for (let ii = 0; ii < pageData.length * 2 - 1; ii++) {
				if (ii % 2 == 0) {
					const index = ii / 2;
					const page = pageData[index];
					if ((scrollVal as number) >= page.start && (scrollVal as number) <= page.end) {
						curPageNum = page.page;
						break;
					}
				} else {
					const index0 = (ii - 1) / 2;
					const index1 = (ii + 1) / 2;
					const prevpage = pageData[index0];
					const nextpage = pageData[index1];
					if (
						(scrollVal as number) > prevpage.end &&
						(scrollVal as number) <= nextpage.start
					) {
						const progress =
							((scrollVal as number) - prevpage.end) /
							(nextpage.start - prevpage.end);
						curPageNum = prevpage.page + progress;
						break;
					}
				}
			}

			prevScroll = scrollVal;

			curPageNum = Math.floor(curPageNum as number);

			if (isNaN(curPageNum) === false && curPageNum !== pageNum) {
				store.dispatch(updatePageHandler(curPageNum));
			}
		}
	}
}
