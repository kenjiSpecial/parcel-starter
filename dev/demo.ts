import { App } from '../src/index';

const app = new App();

start();

function start() {
	app.start();
	app.startToLoad();
}
