import * as React from 'react';
import { Component } from 'react';
import { QuntumGL } from '../gl/QuntumGL';
import { store } from '../store/index';
import { getUrlParameter } from '../utils/function';

export class BgGL extends Component {
	private app: QuntumGL | null = null;
	private prevIsFetchData: boolean = false;

	componentDidMount() {
		const canvas = this.refs.canvas;
		
		this.app = new QuntumGL(canvas as HTMLCanvasElement);

		store.subscribe(() => {
			const appState = store.getState().app;
					
			if (appState.isFetchData === false && this.prevIsFetchData === true) {
				this.startApp();
			}
			this.prevIsFetchData = appState.isFetchData;
		});
	}
	private startApp() {
		(this.app as QuntumGL).start();
	}
	render() {
		return (
			<div className="canvas-container">
				<canvas ref="canvas" />
			</div>
		);
	}
}
