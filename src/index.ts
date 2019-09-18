import { PerspectiveCamera } from 'dan-shari-gl';

import dat from 'dat.gui';
import { TweenMax } from 'gsap';
import Stats from 'stats-js';

import { Sphere } from './components/sphere/sphere';

export class App {
	public width: number;
	public height: number;
	public canvas: HTMLCanvasElement;

	private gl: WebGLRenderingContext;
	private stats!: Stats;
	private camera: PerspectiveCamera;
	private sphere: Sphere;
	private isLoop: boolean;
	private gui: dat.GUI;
	private playAndStopGui: dat.GUIController;

	constructor({
		width,
		height,
		canvas,
		isDebug
	}: {
		width: number;
		height: number;
		canvas: HTMLCanvasElement;
		isDebug: boolean;
	}) {
		this.width = width;
		this.height = height;
		if (!canvas) {
			this.canvas = document.createElement('canvas');
		} else {
			this.canvas = canvas;
		}

		this.gl = this.canvas.getContext('webgl');

		if (isDebug) {
			this.stats = new Stats();
			document.body.appendChild(this.stats.dom);
			this.addGui();
		}

		this.resize(this.width, this.height);

		this.createCamera();
		this.createSphere();
		
		window.addEventListener('focus', () => {
			if (!this.isLoop) {
				this.playAndStop();
			}
		});

		window.addEventListener('blur', () => {
			if (this.isLoop) {
				this.playAndStop();
			}
		});
	}
	public start() {
		this.isLoop = true;
		TweenMax.ticker.addEventListener('tick', this.tick, this);
	}

	public keydown(ev: KeyboardEvent) {
		switch (ev.which) {
			case 27:
				this.playAndStop();
				break;
			default:
		}
	}

	public resize(width: number, height: number) {
		this.width = width;
		this.height = height;

		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.gl.viewport(0, 0, this.width, this.height);

		if (this.camera) {
			this.camera.updateAspect(this.width, this.height);
		}
	}

	private addGui(){
		this.gui = new dat.GUI();
		this.playAndStopGui = this.gui.add(this, 'playAndStop').name('pause');
	}

	private createCamera() {
		this.camera = new PerspectiveCamera(this.width, this.height, 45, 0.1, 1000);
		this.camera.updatePosition(0, 0, 40);
		this.camera.updateLookAtPosition(0, 0, 0);
		this.camera.updateViewMatrix();
	}

	private createSphere() {
		this.sphere = new Sphere(this.gl);
	}

	private tick() {
		const gl: WebGLRenderingContext = this.gl;

		gl.clearColor(1, 1, 1, 1);
		gl.enable(gl.DEPTH_TEST);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		gl.viewport(0, 0, this.width, this.height);

		this.sphere.render(this.camera);

		if (this.stats) {
			this.stats.update();
		}
	}

	private playAndStop() {
		this.isLoop = !this.isLoop;
		if (this.isLoop) {
			TweenMax.ticker.addEventListener('tick', this.tick, this);
			if (this.playAndStopGui) { this.playAndStopGui.name('pause'); }
		} else {
			TweenMax.ticker.removeEventListener('tick', this.tick, this);
			if (this.playAndStopGui) { this.playAndStopGui.name('play'); }
		}
	}
}
