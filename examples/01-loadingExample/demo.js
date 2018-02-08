'use strict';

import App from './app';

var urlParams = new URLSearchParams(window.location.search);
const isDebug = !(urlParams.has('NoDebug') || urlParams.has('NoDebug/'));
let loading, loadingText, loadingResult, loadingInitializing;

let app;

(() => {
	init();
	start();
})();

function init() {
	app = new App({
		isDebug: isDebug
	});

	app.on('loadAssetsDone', () => {
		loadingText.style.display = 'none';
		loadingResult.style.display = 'none';
		loadingInitializing.style.display = 'block';
	});

	app.on('loadAssetsDone', () => {
		loading.style.display = 'none';
		startApp();
	});

	document.body.appendChild(app.canvas);
}

function start() {
	loading = document.getElementById('tubugl-loading');
	loadingText = document.getElementById('tubugl-loading-text');
	loadingResult = document.getElementById('tubugl-loading-result');
	loadingInitializing = document.getElementById('tubugl-loading-initializing');

	app.startLoading();
}

function startApp() {
	app.animateIn();
}

window.addEventListener('resize', function() {
	app.resize(window.innerWidth, window.innerHeight);
});

window.addEventListener('keydown', function(ev) {
	app.onKeyDown(ev);
});
