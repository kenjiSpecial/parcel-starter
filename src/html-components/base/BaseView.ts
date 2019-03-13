import { BASE_HTML } from './baseHtml';

export class BaseView {
	public countryDataParent: HTMLElement;
	public navParent: HTMLElement;
	public albumNavigationParent: HTMLElement;
	public canvas: HTMLCanvasElement;
	private parent: HTMLElement;
	private container: HTMLElement;
	constructor(parent: HTMLElement) {
		this.parent = parent;
	}
	public render() {
		const result = BASE_HTML;
		this.parent.innerHTML = result;

		this.getParents();
	}

	private getParents() {
		this.container = this.parent.getElementsByClassName(
			'app-container'
		)[0] as HTMLCanvasElement;
		this.canvas = this.parent.getElementsByClassName('gl-canvas')[0] as HTMLCanvasElement;
		this.navParent = this.parent.getElementsByClassName(
			'navvigation-container__relative'
		)[0] as HTMLElement;
		this.countryDataParent = this.parent.getElementsByClassName(
			'country-data-container'
		)[0] as HTMLElement;
		this.albumNavigationParent = this.parent.getElementsByClassName(
			'album-navigation-container'
		)[0] as HTMLElement;
	}
}
