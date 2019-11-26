import * as React from 'react';
import { Component } from 'react';
import { QuntumGL } from '../gl/QuntumGL';

export class BgGL extends Component {
    private app?: QuntumGL;

	componentDidMount() {
		const canvas = this.refs.canvas;
        console.log(canvas);
        this.app = new QuntumGL(canvas as HTMLCanvasElement);
        this.app.start();
	}
	render() {
		return (
			<div>
				<canvas ref="canvas" />
			</div>
		);
	}
}
