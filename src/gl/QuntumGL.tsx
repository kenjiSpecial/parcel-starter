import {
	WebGLRenderer,
	Scene,
	PerspectiveCamera,
	BoxGeometry,
	MeshBasicMaterial,
	Mesh
} from 'three';
import { GUI, GUIController } from 'dat.gui';
import { gsap } from 'gsap';
import { store } from '../store';
import { updateScrollHandler } from '../store/app';

export class QuntumGL {
	private renderer: WebGLRenderer;
	private scene: Scene = new Scene();
	private camera: PerspectiveCamera = new PerspectiveCamera(
		45,
		window.innerWidth / window.innerHeight,
		1,
		10000
	);
	private gui?: GUI;
	private isLoop: boolean = false;
	private playAndStopGui?: GUIController;
	private mesh: Mesh | null = null;
	private appState: number = 0;

	constructor(canvas: HTMLCanvasElement) {
		this.loop = this.loop.bind(this);

		this.renderer = new WebGLRenderer({
			canvas: canvas,
			antialias: true
		});
		this.renderer.setClearColor(0xffffff, 1);
		this.camera.position.z = 100;

		this.createMesh();
		if (store.getState().app.isDebug) this.setupDebug();
		this.resize();

		this.subscribeStore();
	}

	private subscribeStore() {
		const appStore = store.getState().app;
		var prevPage = appStore.pageNum;

		store.subscribe(updateStore);

		const self = this;
		function updateStore() {
			const appState = store.getState().app.pageNum as number;
			if (appState !== prevPage) {
				self.appState = appState;
				prevPage = appState;
			}
		}
	}

	private setupDebug() {
		this.gui = new GUI();
		this.playAndStopGui = this.gui.add(this, 'playAndStop').name('pause');
		this.gui.add(this, 'appState').listen();
	}

	private createMesh() {
		let geometry = new BoxGeometry(20, 20, 20);
		let mat = new MeshBasicMaterial({ color: 0xffff00 });

		this.mesh = new Mesh(geometry, mat);
		(this.scene as Scene).add(this.mesh);
	}

	private playAndStop() {
		if (this.isLoop) {
			this.pause();
			(this.playAndStopGui as GUIController).name('play');
		} else {
			this.start();
			(this.playAndStopGui as GUIController).name('pause');
		}
	}

	private updatecrollChecker() {
		const doc = document.documentElement;
		const scrollTop = doc.scrollTop;

		store.dispatch(updateScrollHandler(scrollTop));
	}

	private loop() {
		this.updatecrollChecker();

		const mesh = this.mesh as Mesh;
		mesh.rotation.x += 0.01;
		mesh.rotation.z += 0.01;
		this.renderer.render(this.scene, this.camera);
	}

	public start() {
		this.isLoop = true;
		gsap.ticker.add(this.loop);
	}

	public pause() {
		this.isLoop = false;
		gsap.ticker.remove(this.loop);
	}

	onKeyDown(ev: KeyboardEvent) {
		switch (ev.which) {
			case 27:
				this.playAndStop();
				break;
		}
	}

	resize() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();

		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}

	destroy() {}
}
