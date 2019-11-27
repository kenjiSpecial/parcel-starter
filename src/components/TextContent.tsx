import * as React from 'react';
import { Component } from 'react';
import { store } from '../store';
import { Top } from './text/section/top';
import { Chapter1 } from './text/section/chapter1';

interface IProps {}

interface IState {
	isLoaded: boolean;
	className: string;
}

export class TextContent extends Component<IProps, IState> {
	private prevIsFetchData: boolean = false;
	state = {
		isLoaded: false,
		className: 'text-container'
	};
    
    componentDidMount() {
		

		store.subscribe(() => {
			const appState = store.getState().app;
			if (appState.isFetchData === true && this.prevIsFetchData === false) {
				this.setState({isLoaded: true});
			}
			this.prevIsFetchData = appState.isFetchData;
		});
	}

	render() {
        if(this.state.isLoaded === false){
            return(<div/>)
		}
		
		const style0 = {'background': 'rgba(255, 0, 0, 0.3)'};
		const style1 = {'background': 'rgba(0, 0, 255, 0.3)'};

		return (
			<div className={this.state.className} >
				<Top/>
				<Chapter1/>
			</div>
		);
	}
}
