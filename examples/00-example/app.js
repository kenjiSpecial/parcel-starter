const TweenLite = require('gsap/src/uncompressed/TweenLite');
import dat from 'dat.gui';
import Stats from 'Stats';

import { PerspectiveCamera } from 'dan-shari-gl';
import { Sphere } from './components/sphere/sphere';

export default class App {
	constructor(params = {}) {
		this._isMouseDown = false;
		this.width = params.width ? params.width : window.innerWidth;
		this.height = params.height ? params.height : window.innerHeight;

		this.canvas = document.createElement('canvas');
		this.gl = this.canvas.getContext('webgl');

		if (params.isDebug) {
			this._stats = new Stats();
			document.body.appendChild(this._stats.dom);
			this.addGui();
		} else {
			let descId = document.getElementById('tubugl-desc');
			descId.style.display = 'none';
		}

		this.resize(this.width, this.height);

		this.createCamera();
		this.createSphere();
	}

	addGui() {
		this.gui = new dat.GUI();
		this.playAndStopGui = this.gui.add(this, '_playAndStop').name('pause');
	}

	animateIn() {
		this.isLoop = true;
		TweenLite.ticker.addEventListener('tick', this.loop, this);
	}

	createCamera() {
		this.camera = new PerspectiveCamera(this.width, this.height, 45, 0.1, 1000);
		this.camera.updatePosition(0, 0, 40);
		this.camera.updateLookAtPosition(0, 0, 0);
		this.camera.updateViewMatrix();
	}

	createSphere() {
		this.sphere = new Sphere(this.gl);
	}

	loop() {
		if (this._stats) this._stats.update();

		const gl = this.gl;

		gl.clearColor(1, 1, 1, 1);
		gl.enable(gl.DEPTH_TEST);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		gl.viewport(0, 0, this.width, this.height);

		this.sphere.render(this.camera);
	}

	animateOut() {
		TweenLite.ticker.removeEventListener('tick', this.loop, this);
	}

	mouseMoveHandler(mouse) {
		if (!this._isMouseDown) return;

		this._prevMouse = mouse;
	}

	mouseDownHandler(mouse) {
		this._isMouseDown = true;
		this._prevMouse = mouse;
	}

	mouseupHandler() {
		this._isMouseDown = false;
	}

	onKeyDown(ev) {
		switch (ev.which) {
			case 27:
				this.playAndStop();
				break;
		}
	}

	playAndStop() {
		this.isLoop = !this.isLoop;
		if (this.isLoop) {
			TweenLite.ticker.addEventListener('tick', this.loop, this);
			if (this.playAndStopGui) this.playAndStopGui.name('pause');
		} else {
			TweenLite.ticker.removeEventListener('tick', this.loop, this);
			if (this.playAndStopGui) this.playAndStopGui.name('play');
		}
	}

	resize(width, height) {
		this.width = width;
		this.height = height;

		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.gl.viewport(0, 0, this.width, this.height);

		if (this.camera) this.camera.updateAspect(this.width, this.height);
	}

	destroy() {}
}
