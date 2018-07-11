const TweenLite = require('gsap/src/uncompressed/TweenLite');
import dat from '../vendors/dat.gui.min.js';
import Stats from  '../vendors/stats.min';

import { Program, ArrayBuffer, IndexArrayBuffer } from 'tubugl-core';
import vertexShader from './components/shaders/shader-vert.glsl';
import fragmentShader from './components/shaders/shader-frag.glsl';
import { appCall } from '../../src/index';

export default class App {
	constructor(params = {}) {
		this._isMouseDown = false;
		this._width = params.width ? params.width : window.innerWidth;
		this._height = params.height ? params.height : window.innerHeight;

		this.canvas = document.createElement('canvas');
		this.gl = this.canvas.getContext('webgl');

		if (params.isDebug) {
			this._stats = new Stats();
			document.body.appendChild(this._stats.dom);
			this._addGui();
		} else {
			let descId = document.getElementById('tubugl-desc');
			descId.style.display = 'none';
		}

		this._createProgram();
		this.resize(this._width, this._height);
	}

	_addGui() {
		this.gui = new dat.GUI();
		this.playAndStopGui = this.gui.add(this, '_playAndStop').name('pause');
	}

	_createProgram() {
		this._program = new Program(this.gl, vertexShader, fragmentShader);

		let side = 1.0;
		let vertices = new Float32Array([
			-side / 2,
			-side / 2,
			side / 2,	
			-side / 2,
			side / 2,
			side / 2,
			-side / 2,
			side / 2
		]);

		let indices = new Uint16Array([0, 1, 2, 0, 2, 3]);

		this._arrayBuffer = new ArrayBuffer(this.gl, vertices);
		this._arrayBuffer.setAttribs('a_position', 2, this.gl.FLOAT, false, 0, 0);

		this._indexBuffer = new IndexArrayBuffer(this.gl, indices);

		this._obj = {
			program: this._program,
			positionBuffer: this._arrayBuffer,
			indexBuffer: this._indexBuffer,
			count: 6
		};
	}

	animateIn() {
		this.isLoop = true;
		TweenLite.ticker.addEventListener('tick', this.loop, this);
	}

	loop() {
		if(this._stats) this._stats.update();
		
		this.gl.clearColor(0, 0, 0, 1);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);

		this._obj.program.bind();
		this._obj.indexBuffer.bind();
		this._obj.positionBuffer.bind().attribPointer(this._obj.program);

		this.gl.drawElements(this.gl.TRIANGLES, this._obj.count, this.gl.UNSIGNED_SHORT, 0);
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
				this._playAndStop();
				break;
		}
	}

	_playAndStop() {
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
		this._width = width;
		this._height = height;

		this.canvas.width = this._width;
		this.canvas.height = this._height;
		this.gl.viewport(0, 0, this._width, this._height);
	}

	destroy() {}
}
