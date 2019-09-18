import { App } from '../src/index';

const canvas: HTMLCanvasElement = document.getElementById('app-canvas') as HTMLCanvasElement;
const isDebug = true;
const app = new App({
	width: window.innerWidth,
	height: window.innerHeight,
	canvas: canvas,
	isDebug: isDebug
});
app.start();

window.addEventListener('resize', () => {
	if (app) {
		app.resize(window.innerWidth, window.innerHeight);
	}
});

window.addEventListener('keydown', (ev: KeyboardEvent) => {
	if (app) {
		app.keydown(ev);
	}
});
