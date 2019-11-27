import { store } from '../store';
import { updatePagePositionHandler } from '../store/app';

export function getUrlParameter(name: string) {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	var regex = new RegExp('[\\?&]' + name);
	var results = regex.exec(location.search);
	console.log(results);
	return results === null ? false : true;
}

export function calcHeight() {
	const pages = document.getElementsByClassName('page');

	const pageMarkers = [];

	for (let ii = 0; ii < pages.length; ii = ii + 1) {
		const pageElement = pages[ii];
		const elementBound = pageElement.getBoundingClientRect();
		const start = window.scrollY + elementBound.top;
		const end = start + elementBound.height;
		const page = ii;
		pageMarkers.push({ page, start, end });
	}
	console.log(pageMarkers);

	store.dispatch(updatePagePositionHandler(pageMarkers));
}
