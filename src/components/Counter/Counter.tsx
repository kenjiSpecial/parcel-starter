import * as React from 'react';
import { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { store } from '../../store/index';
import { decrement, increment } from '../../store/page/actions';

interface IProps {
	superhero: string;
}

interface IState {
	ch: number;
	section: number;
}

export class Counter extends Component<IProps, IState> {
	state = { ch: 0, section: 0 };

	private increment() {
		store.dispatch(increment());
	}

	private decrement() {
		store.dispatch(decrement());
	}

	componentDidMount() {
		store.subscribe(() => {
			this.setState({ ch: store.getState().page.ch, section: store.getState().page.section });
		});
	}

	render() {
		return (
			<div>
				<h1>
					chapter: {this.state.ch}, section: {this.state.section}
				</h1>
				<button onClick={this.increment}>+</button>
				<button onClick={this.decrement}>-</button>
			</div>
		);
	}
}
