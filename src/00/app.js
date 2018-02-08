const dat = require('../vendor/dat.gui.min');
// const TweenMax = require('gsap/src/TweenMax');
require('gsap');
const Stats = require('stats.js');

import furImageURL from '../assets/earth.jpg';
// import furImageURL from '../assets/fur.jpg';
import unevenAlphaImageURL from '../assets/noise.jpg';

import { Program, ArrayBuffer, Texture } from 'tubugl-core';
import { PerspectiveCamera, CameraController } from 'tubugl-camera';
import { COLOR_BUFER_BIT, DEPTH_BUFFER_BIT } from 'tubugl-constants';
import { Fur } from './fur';
import { FurSphere } from './furSphere';

export default class App {
	constructor(params = {}) {
		this._width = params.width ? params.width : window.innerWidth;
		this._height = params.height ? params.height : window.innerHeight;

		this.canvas = document.createElement('canvas');
		this.gl = this.canvas.getContext('webgl2', { transparent: false });
		if (this.gl) this.isWebgl2 = true;

		if (params.isDebug) {
			this.stats = new Stats();
			document.body.appendChild(this.stats.dom);
			this._addGui();
		} else {
			let descId = document.getElementById('tubugl-desc');
			descId.style.display = 'none';
		}

		this._makeCamera();
		this._makeCameraController();
		this._makeShape();

		this.resize(this._width, this._height);
	}

	_addGui() {
		this.gui = new dat.GUI();
		this.playAndStopGui = this.gui.add(this, '_playAndStop').name('pause');
	}

	_makeShape() {
		this._cube = new FurSphere(this.gl, { isGl2: this.isWebgl2 }, 200, 32, 32);
	}

	_makeCamera() {
		this._camera = new PerspectiveCamera(window.innerWidth, window.innerHeight, 60, 1, 2000);
		this._camera.position.z = 800;
		this._camera.lookAt([0, 0, 0]);
	}

	_makeCameraController() {
		this._cameraController = new CameraController(this._camera, this.canvas);
		this._cameraController.minDistance = 400;
		this._cameraController.maxDistance = 1200;
	}

	animateIn() {
		this._startLoad();
	}

	loop() {
		if (this.stats) this.stats.update();
		let gl = this.gl;

		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		this._camera.update();
		this._cube.render(this._camera, this._furTexture, this._alphaTexture);
	}

	animateOut() {
		TweenMax.ticker.removeEventListener('tick', this.loop, this);
	}

	onKeyDown(ev) {
		switch (ev.which) {
			case 27:
				this._playAndStop();
				break;
		}
	}

	_onload() {
		this._imgCnt++;
		if (this._imgCnt < 2) return;

		console.log('onload');
		this._furTexture = new Texture(this.gl);
		this._furTexture.name = 'diffuseMap';
		this._furTexture
			.bind()
			.setFilter()
			.wrap()
			.fromImage(this._furImage, this._furImage.width, this._furImage.height);

		this._alphaTexture = new Texture(this.gl);
		this._alphaTexture.name = 'alphaMap';
		this._alphaTexture
			.bind()
			.setFilter()
			.wrap()
			.fromImage(this._alphaImage, this._alphaImage.width, this._alphaImage.height);

		// // -- // --- // --- // --|- _ -|-- \\ --- \\ --- \\ -- \\ \\

		this._playAndStop();
	}

	_startLoad() {
		this._imgCnt = 0;

		this._furImage = new Image();
		this._furImage.onload = this._onload.bind(this);
		this._furImage.onerror = function() {
			console.error('image load error');
		};
		this._furImage.src = furImageURL;

		this._alphaImage = new Image();
		this._alphaImage.onload = this._onload.bind(this);
		this._alphaImage.onerror = function() {
			console.error('image load error');
		};
		this._alphaImage.src = unevenAlphaImageURL;
	}

	_playAndStop() {
		this.isLoop = !this.isLoop;
		if (this.isLoop) {
			TweenMax.ticker.addEventListener('tick', this.loop, this);
			if (this.playAndStopGui) this.playAndStopGui.name('pause');
		} else {
			TweenMax.ticker.removeEventListener('tick', this.loop, this);
			if (this.playAndStopGui) this.playAndStopGui.name('play');
		}
	}

	resize(width, height) {
		this._width = width;
		this._height = height;

		this.canvas.width = this._width;
		this.canvas.height = this._height;
		this.gl.viewport(0, 0, this._width, this._height);

		// this._obj.program.bind();
		// this.gl.uniform1f(
		// 	this._program.getUniforms('uWindowRate').location,
		// 	this._height / this._width
		// );
	}

	destroy() {}
}
