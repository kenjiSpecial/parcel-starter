import * as React from 'react';
import { Component } from 'react';
import { Counter } from './Counter';
import { BgGL } from './BgGL';
import { store } from '../store';
import { startLoadHandler, loadedHandler } from '../store/app';
import { TextContent } from './TextContent';
import { calcHeight } from '../utils/function';

export class App extends Component {
	private prevIsFetchData: boolean = true;

	componentDidMount() {
		store.subscribe(() => {
			// console.log(store.getState().app.isFetchData );
			if(store.getState().app.isFetchData === false && this.prevIsFetchData === true){
				setTimeout(calcHeight, 0);
			}
			this.prevIsFetchData = store.getState().app.isFetchData;
			
		});
		store.dispatch(startLoadHandler());
		

		this.startDummyDataLoad();
		
	}

	private startDummyDataLoad() {
		setTimeout(() => {
			store.dispatch(loadedHandler());
		});
	}

	render() {
		return (
			<div className="container">
				<BgGL />
				<TextContent />
			</div>
		);
	}
}
