import dat from 'dat.gui';
import { TweenMax } from 'gsap';
import Stats from 'stats-js';
import { GlView } from './gl/GlView';
import { BaseView } from './html-components/base/BaseView';
import { Debug } from './html-components/debug/Debug';
import { AppModel } from './models/AppModel';
import { DataModel } from './models/DataModel';
import { JSON_LOAD_DONE, LOAD_DONE } from './utils/eventNames';
import { Loader } from './utils/loader';
import { TexturePools } from './utils/texturePools';
import { BaseViewModel } from './view-models/BaseViewModel';
import { GlViewModel } from './view-models/GlViewModel';

export class App {
	public width: number;
	public height: number;

	private isLoop: boolean;
	private readonly isDebug: boolean;
	private debugParent: HTMLElement;

	private debug: Debug;
	private stats!: Stats;
	private gui: dat.GUI;
	private playAndStopGui: dat.GUIController;

	// views
	private baseView: BaseView;
	private glView: GlView;
	// models
	private dataModel: DataModel;
	private appModel: AppModel;
	// view models
	private baseViewModel: BaseViewModel;
	private glViewModel: GlViewModel;

	constructor({
		parent,
		width,
		height,
		isDebug
	}: {
		parent: HTMLElement;
		width: number;
		height: number;
		isDebug: boolean;
	}) {
		this.isDebug = isDebug;
		if (this.isDebug) {
			this.createDebug();
			// this.debug.calStart();
		}

		this.resize(width, height);

		this.createAppModel();
		this.createBaseView(parent);
		this.createBaseViewModel();
		this.createGlView();
	}

	public keydown(ev: KeyboardEvent) {
		switch (ev.which) {
			case 27:
				this.playAndStop();
				break;
			default:
		}
	}

	public loadStart() {
		const loader = Loader.GET_INSTANCE();
		loader.on(JSON_LOAD_DONE, () => {
			this.jsonLoadDone();
		});

		loader.on(LOAD_DONE, () => {
			this.loadDone();
		});

		loader.jsonLoadStart();
	}

	public resize(width: number, height: number) {
		this.width = width;
		this.height = height;
	}

	// private

	private start() {
		this.isLoop = true;

		// tslint:disable-next-line: no-unsafe-any
		TweenMax.ticker.addEventListener('tick', this.tick, this);
	}

	private jsonLoadDone() {
		this.createDataModel();
	}

	private loadDone() {
		this.createViews();
		this.createViewModels();
		this.start();
	}

	// models

	private createAppModel() {
		this.appModel = new AppModel();
	}

	private createDataModel() {
		const loader: Loader = Loader.GET_INSTANCE();
		console.log(loader);
		this.dataModel = new DataModel(loader.json.data);
	}

	// views
	private createViews() {}

	private createBaseView(parent: HTMLElement) {
		this.baseView = new BaseView(parent);
	}

	private createGlView() {
		this.glView = new GlView(this.width, this.height, this.baseView.canvas, this.isDebug);

		const texturePools = TexturePools.GET_INSTANCE();
		texturePools.setGL(this.glView.getGL());
	}

	// view model
	private createViewModels() {
		this.glViewModel = new GlViewModel(this.appModel, this.dataModel, this.glView);
	}

	private createBaseViewModel() {
		this.baseViewModel = new BaseViewModel(this.appModel, this.baseView);
	}

	private tick() {
		if (this.stats) {
			this.stats.update();
		}

		this.updateViewModels();
	}

	private updateViewModels() {
		this.glViewModel.update();
	}

	private playAndStop() {
		this.isLoop = !this.isLoop;
		if (this.isLoop) {
			TweenMax.ticker.addEventListener('tick', this.tick, this);
			if (this.playAndStopGui) {
				this.playAndStopGui.name('pause');
			}
		} else {
			TweenMax.ticker.removeEventListener('tick', this.tick, this);
			if (this.playAndStopGui) {
				this.playAndStopGui.name('play');
			}
		}
	}

	private createDebug() {
		this.debugParent = document.createElement('div');
		this.debugParent.classList.add('debug-container');
		document.body.appendChild(this.debugParent);
		this.stats = new Stats();
		this.debugParent.appendChild(this.stats.dom);

		this.debug = new Debug(this.debugParent);
		this.addGui();
	}

	private addGui() {
		this.gui = new dat.GUI();
		this.playAndStopGui = this.gui.add(this, 'playAndStop').name('pause');

		const debugGui = this.gui
			.add(this.debug, 'isShow')
			.name('hideDebug')
			.onChange(() => {
				if (this.debug.isShow) {
					debugGui.name('hideDebug');
				} else {
					debugGui.name('showGui');
				}
			});
	}
}
