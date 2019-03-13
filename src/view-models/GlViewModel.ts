import { AppModel } from '../models/AppModel';
import { DataModel } from '../models/DataModel';
import { GlView } from './../gl/GlView';

export class GlViewModel {
	private appModel: AppModel;
	private dataModel: DataModel;
	private view: GlView;
	constructor(appModel: AppModel, dataModel: DataModel, view: GlView) {
		this.appModel = appModel;
		this.dataModel = dataModel;
		this.view = view;
	}

	public update() {
		this.view.render();
	}
}
