import {ThreeJsApp} from './threejs/app';

export class App {
	private threeJsApp: ThreeJsApp 
	constructor() {
		const canvas = document.getElementById('canvas');
		this.threeJsApp = new ThreeJsApp(canvas as HTMLCanvasElement);
	}

	public start(){
		this.threeJsApp.start();
	}

	public startToLoad() {
		this.threeJsApp.startToLoad();
		this.threeJsApp.addEventListener('loaded', ()=>{
			console.log('loaded');
		})
	}
}
