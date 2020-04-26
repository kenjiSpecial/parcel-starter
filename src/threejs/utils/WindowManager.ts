import { EventDispatcher } from 'three';
import { PIXEL_RATIO } from './constants';
import { RESIZE } from './eventNames';

export class WindowManager extends EventDispatcher {
	private static instance: WindowManager;
	private viewWidth: number;
	private viewHeight: number;
	private canvasWidth: number;
	private canvasHeight: number;
	private viewportWidth: number;
	private viewportHeight: number;

	private constructor() {
		super();

		window.addEventListener('resize', () => {
			this.setSize(window.innerWidth, window.innerHeight);
		});
		this.setSize(window.innerWidth, window.innerHeight);
	}

	public static GET_INSTANCE() {
		if (!WindowManager.instance) {
			WindowManager.instance = new WindowManager();
			// ... any one time initialization goes here ...
		}

		return WindowManager.instance;
	}

	public static GET_SIZE() {
		if (!WindowManager.instance) {
			WindowManager.instance = new WindowManager();
			// ... any one time initialization goes here ...
		}

		return WindowManager.instance.getSize();
	}

	public setSize(width: number, height: number) {
		
		this.canvasWidth = width;
		this.canvasHeight = height;
		
		this.viewportWidth = this.viewWidth;
		this.viewportHeight = this.viewHeight;

		this.dispatchEvent({type: RESIZE});
	}

	public getSize() {
		return {
			canvasWidth: this.canvasWidth,
			canvasHeight: this.canvasHeight,
			viewportWidth: this.viewportWidth,
			viewportHeight: this.viewportHeight,
		};
	}
}
