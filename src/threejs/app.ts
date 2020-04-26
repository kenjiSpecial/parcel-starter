import { GUI, GUIController } from 'dat.gui';
import { gsap } from 'gsap';
import {
	BoxGeometry,
	BufferGeometry,
	EventDispatcher,
	Geometry,
	Mesh,
	MeshBasicMaterial,
	Object3D,
	PerspectiveCamera,
	Scene,
	Vector3
} from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { Agent } from './components/agent';
import { Renderer } from './components/renderer';
import { RESIZE } from './utils/eventNames';
import { WindowManager } from './utils/WindowManager';

export interface IBase {
	reset(): void;
}

export class ThreeJsApp extends EventDispatcher implements IBase {
	private renderer: Renderer;
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
	private isDebug = true;
	private agentGeometry: BufferGeometry;

	constructor(canvas: HTMLCanvasElement) {
		super();

		this.loop = this.loop.bind(this);
		this.renderer = new Renderer(canvas);

		this.addEvents();

		this.resize();
		this.reset();

		if (this.isDebug) {
			this.setupDebug();
		}
	}

	public start() {
		this.isLoop = true;
		gsap.ticker.add(this.loop);
	}

	public pause() {
		this.isLoop = false;
		gsap.ticker.remove(this.loop);
	}

	public resize() {
		const { canvasWidth, canvasHeight } = WindowManager.GET_SIZE();
		this.camera.aspect = canvasWidth / canvasHeight;
		this.camera.updateProjectionMatrix();

		this.renderer.resize(canvasWidth, canvasHeight);
	}

	public destroy() {}

	public onKeyDown(ev: KeyboardEvent) {
		switch (ev.which) {
			case 27:
				this.playAndStop();
				break;
			default:
		}
	}

	public startToLoad() {
		const objURLDir = 'model/agent.obj';
		const loader = new OBJLoader();

		loader.load(
			objURLDir,
			(object: Object3D) => {
				// this.scene.add(object)
				this.agentGeometry = (object.children[0] as Mesh).geometry as BufferGeometry;
				this.createAgents();

				// scene.add( object );
				this.dispatchEvent({ type: 'loaded' });
			},
			// called when loading is in progresses
			xhr => {
				console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
			},
			// called when loading has errors
			error => {
				console.log('An error happened');
			}
		);
	}

	public reset() {
		this.camera.position.z = 100;
		this.camera.position.y = 30;
		this.camera.lookAt(new Vector3(0, 0, 0));
	}

	private createAgents() {
		const agent = new Agent(this.agentGeometry);
		this.scene.add(agent);
	}

	private setupDebug() {
		this.gui = new GUI();
		this.playAndStopGui = this.gui.add(this, 'playAndStop').name('pause');
		this.gui.add(this, 'appState').listen();
	}

	private playAndStop() {
		if (this.isLoop) {
			this.pause();
			this.playAndStopGui.name('play');
		} else {
			this.start();
			this.playAndStopGui.name('pause');
		}
	}

	private loop() {
		this.renderer.render(this.scene, this.camera);
	}

	private addEvents() {
		const wndowManager = WindowManager.GET_INSTANCE();
		wndowManager.addEventListener(RESIZE, () => {
			this.resize();
		});
	}
}
