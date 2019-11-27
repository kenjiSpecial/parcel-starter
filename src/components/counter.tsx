import * as React from 'react';
import { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { store } from '../store/index';

import { CounterState, incrementCounter, decrementCounter } from '../store/counter/';

interface IProps {
	superhero: string;
}

interface IState {
	health: number;
}

export class Counter extends Component<IProps, IState> {
	state = { health: store.getState().count.count };
	private increment() {
		store.dispatch(incrementCounter());
	}

	private decrement() {
		store.dispatch(decrementCounter());
	}

	componentDidMount() {
		store.subscribe(() => {
			this.setState({ health: store.getState().count.count });
		});
	}
 
	render() {
		return (
			<div>
				<h1>
					Counter: {this.props.superhero}, {this.state.health}
				</h1>
				<button onClick={this.increment}>+</button>
				<button onClick={this.decrement}>-</button>
			</div>
		);
	}
}
