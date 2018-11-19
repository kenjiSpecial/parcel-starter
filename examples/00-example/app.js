const TweenLite = require('gsap/src/uncompressed/TweenLite');
import dat from 'dat.gui';
import Stats from 'Stats';
import { createProgram, createBuffer, createIndex, bindBuffer } from 'dan-shari-gl';

console.log(dat, Stats);
import vertexShader from './components/shaders/shader-vert.glsl';
import fragmentShader from './components/shaders/shader-frag.glsl';

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
		this.program = createProgram(this.gl, vertexShader, fragmentShader);

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
		const positionBuffer = createBuffer(this.gl, this.program, vertices, 'a_position');
		const indexBuffer = createIndex(this.gl, indices);

		this.obj = {
			program: this.program,
			buffers: {
				position: positionBuffer,
				index: indexBuffer
			}
		};

		console.log(this.obj);
	}

	animateIn() {
		this.isLoop = true;
		TweenLite.ticker.addEventListener('tick', this.loop, this);
	}

	loop() {
		if (this._stats) this._stats.update();
		this.gl.disable(this.gl.CULL_FACE);

		this.gl.clearColor(0, 0, 0, 1);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);

		this.gl.viewport(0, 0, window.innerWidth, innerHeight);

		this.gl.useProgram(this.program);
		/**
		 *
		 * @param {WebGLRenderingContext} gl
		 * @param {WebGLBuffer} buffer
		 * @param {Number} location
		 * @param {Number} size
		 * @param {Boolean} normalized
		 * @param {Number} stride
		 * @param {Number} offset
		 */
		// bindBuffer(this.gl, this.obj.buffers.array.buffer, 2);
		bindBuffer(this.gl, this.obj.buffers.position.buffer, this.obj.buffers.position.location, 2); 
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.obj.buffers.index.buffer);

		this.gl.drawElements(
			this.gl.TRIANGLES,
			this.obj.buffers.index.cnt,
			this.gl.UNSIGNED_SHORT,
			0
		);
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
