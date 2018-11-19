'use strict';

import App from './app';

let app;

(() => {
	init();
	start();
})();

function init() {
	app = new App({});

	document.body.appendChild(app.canvas);
}

function start() {
	app.animateIn();
}

window.addEventListener('resize', function() {
	if (app && app.resize) app.resize();
});

window.addEventListener('keydown', function(ev) {
	if (app && app.onKeyDown) app.onKeyDown(ev);
});
