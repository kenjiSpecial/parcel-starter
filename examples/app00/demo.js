'use strict';

import App from './index';
// import App from './apps/OrthoApp';

let app;

init();
start();

function init() {
	app = new App({
		isDebug: true
	});

	document.body.appendChild(app.canvas);
	document.addEventListener('mousemove', onDocumentMouseMove, false);
}

function start() {
	app.animateIn();
}

function onDocumentMouseMove(event) {
	// event.preventDefault();

	let mouseX = event.clientX / window.innerWidth * 2 - 1;
	let mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

	app.onMouseMove({ x: mouseX, y: mouseY });
}

window.addEventListener('resize', function() {
	app.resize(window.innerWidth, window.innerHeight);
});

window.addEventListener('keydown', function(ev) {
	app.onKeyDown(ev);
});
