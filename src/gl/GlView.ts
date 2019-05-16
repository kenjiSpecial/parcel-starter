import { PerspectiveCamera } from 'dan-shari-gl';

import dat from 'dat.gui';
import { TweenMax } from 'gsap';
import Stats from 'stats-js';

import { Bg } from './components/bg/Bg';
import { Sphere } from './components/sphere/sphere';

export class GlView {
	public width: number;
	public height: number;
	public canvas: HTMLCanvasElement;

	private readonly gl: WebGLRenderingContext;
	private camera: PerspectiveCamera;
	private sphere: Sphere;
	private bg: Bg;
	private gui: dat.GUI;
	private playAndStopGui: dat.GUIController;

	constructor(width: number, height: number, canvas: HTMLCanvasElement, isDebug: boolean) {
		this.width = width;
		this.height = height;
		if (!canvas) {
			this.canvas = document.createElement('canvas');
		} else {
			this.canvas = canvas;
		}

		this.gl = this.canvas.getContext('webgl');

		this.resize(this.width, this.height);

		this.createCamera();
		this.createSphere();
		this.createBg();
	}

	public resize(width: number, height: number) {
		this.width = width;
		this.height = height;

		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.gl.viewport(0, 0, this.width, this.height);

		if (this.camera) {
			// this.camera.resize(this.width, this.height);
			this.camera.updateSize(this.width, this.height);
		}
	}

	public getGL() {
		return this.gl;
	}

	public render() {
		const gl: WebGLRenderingContext = this.gl;

		gl.clearColor(1, 1, 1, 1);
		gl.enable(gl.DEPTH_TEST);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		gl.viewport(0, 0, this.width, this.height);

		this.bg.render();
		gl.clear(gl.DEPTH_BUFFER_BIT);
		this.sphere.render(this.camera);
	}

	private addGui() {
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

	private createBg() {
		this.bg = new Bg(this.gl);
	}
}
