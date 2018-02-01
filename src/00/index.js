const THREE = require('three');
const OrbitControls = require('three-orbit-controls')(THREE);

const dat = require('../vendors/dat.gui.min');
const TweenMax = require('gsap');
const Stats = require('stats.js');

import { fragmentShader, vertexShader } from './components/shaders/shader';

export default class App {
	constructor(params) {
		this.params = params || {};

		this._makeRenderer();
		this._makeScene();
		this._makeCamera();
		this._makeMesh();

		if (this.params.isDebug) this._setupDebug();

		this._makeUtils();
		this.resize();
	}

	_makeRenderer() {
		this._renderer = new THREE.WebGLRenderer({
			antialias: true
		});
		this.dom = this._renderer.domElement;
	}

	_makeScene() {
		this._scene = new THREE.Scene();
	}

	_makeCamera() {
		this._camera = new THREE.PerspectiveCamera(
			60,
			window.innerWidth / window.innerHeight,
			1,
			10000
		);
		this._camera.position.z = 1000;
	}

	_makeUtils() {
		this._clock = new THREE.Clock();
		this._control = new OrbitControls(this._camera);
	}

	_setupDebug() {
		this._makeStats();
		this._makeGui();
		this._makeGrid();
	}

	_makeStats() {
		this._stats = new Stats();
		document.body.appendChild(this._stats.dom);
	}

	_makeGui() {
		this._gui = new dat.GUI();
		this.playAndStopGui = this._gui.add(this, '_playAndStop').name('pause');
	}

	_makeGrid() {
		var size = 1000;
		var divisions = 20;

		var gridHelper = new THREE.GridHelper(size, divisions);
		this._scene.add(gridHelper);
	}

	_makeMesh() {
		let geometry = new THREE.BoxGeometry(200, 200, 200);
		let mat = new THREE.RawShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader
		});

		this._mesh = new THREE.Mesh(geometry, mat);
		this._scene.add(this._mesh);
	}

	animateIn() {
		this.isLoop = true;
		TweenMax.ticker.addEventListener('tick', this.loop, this);
	}

	loop() {
		// let delta = this.clock.getDelta();

		this._mesh.rotation.x += 0.01;
		this._mesh.rotation.y += 0.02;

		this._renderer.render(this._scene, this._camera);
		if (this._stats) this._stats.update();
	}

	animateOut() {
		TweenMax.ticker.removeEventListener('tick', this.loop, this);
	}

	onMouseMove(mouse) {}

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
			TweenMax.ticker.addEventListener('tick', this.loop, this);
			this.playAndStopGui.name('pause');
		} else {
			TweenMax.ticker.removeEventListener('tick', this.loop, this);
			this.playAndStopGui.name('play');
		}
	}

	resize() {
		this._camera.aspect = window.innerWidth / window.innerHeight;
		this._camera.updateProjectionMatrix();

		this._renderer.setSize(window.innerWidth, window.innerHeight);
	}

	destroy() {}
}
