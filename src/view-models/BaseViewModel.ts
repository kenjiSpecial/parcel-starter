import { BaseView } from './../html-components/base/BaseView';
import { AppModel } from './../models/AppModel';

export class BaseViewModel {
	private appModel: AppModel;
	private view: BaseView;

	constructor(appModel: AppModel, view: BaseView) {
		this.appModel = appModel;
		this.view = view;

		this.view.render();
	}
}
