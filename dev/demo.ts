import { App } from '../src/index';

const parent: HTMLElement = document.getElementsByClassName('main-wrapper')[0] as HTMLElement;

const canvas: HTMLCanvasElement = document.getElementById('app-canvas') as HTMLCanvasElement;
const isDebug = true;

const app = new App({
	parent: parent,
	width: window.innerWidth,
	height: window.innerHeight,
	isDebug: isDebug
});
app.loadStart();

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
