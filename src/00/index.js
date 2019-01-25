const THREE = require('three');
const OrbitControls = require('three-orbit-controls')(THREE);

const dat = require('../vendors/dat.gui.min');
// const TweenMax = require('gsap');
import TweenMax from 'gsap/TweenMax';
const Stats = require('stats.js');

import { fragmentShader, vertexShader } from './components/shaders/shader';

export default class App {
	constructor(params) {
		this.params = params || {};

		this.makeRenderer();
		this.makeScene();
		this.makeCamera();
		this.makeMesh();

		if (this.params.isDebug) this.setupDebug();

		this.makeUtils();
		this.resize();
	}

	makeRenderer() {
		this.renderer = new THREE.WebGLRenderer({
			antialias: true
		});
		this.dom = this.renderer.domElement;
	}

	makeScene() {
		this.scene = new THREE.Scene();
	}

	makeCamera() {
		this.camera = new THREE.PerspectiveCamera(
			60,
			window.innerWidth / window.innerHeight,
			1,
			10000
		);
		this.camera.position.z = 1000;
	}

	makeUtils() {
		this.clock = new THREE.Clock();
		this.control = new OrbitControls(this.camera);
	}

	setupDebug() {
		this.makeStats();
		this.makeGui();
		this.makeGrid();
	}

	makeStats() {
		this.stats = new Stats();
		document.body.appendChild(this.stats.dom);
	}

	makeGui() {
		this.gui = new dat.GUI();
		this.playAndStopGui = this.gui.add(this, 'playAndStop').name('pause');
	}

	makeGrid() {
		var size = 1000;
		var divisions = 20;

		var gridHelper = new THREE.GridHelper(size, divisions);
		this.scene.add(gridHelper);
	}

	makeMesh() {
		let geometry = new THREE.BoxGeometry(200, 200, 200);
		let mat = new THREE.RawShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader
		});

		this.mesh = new THREE.Mesh(geometry, mat);
		this.scene.add(this.mesh);
	}

	animateIn() {
		this.isLoop = true;
		TweenMax.ticker.addEventListener('tick', this.loop, this);
	}

	loop() {
		// let delta = this.clock.getDelta();

		this.mesh.rotation.x += 0.01;
		this.mesh.rotation.y += 0.02;

		this.renderer.render(this.scene, this.camera);
		if (this.stats) this.stats.update();
	}

	animateOut() {
		TweenMax.ticker.removeEventListener('tick', this.loop, this);
	}

	onMouseMove(mouse) {}

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
			TweenMax.ticker.addEventListener('tick', this.loop, this);
			this.playAndStopGui.name('pause');
		} else {
			TweenMax.ticker.removeEventListener('tick', this.loop, this);
			this.playAndStopGui.name('play');
		}
	}

	resize() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}

	destroy() {}
}
