import * as React from 'react';
import { Component } from 'react';

interface IProps {
	text: string;
	customStyle?: { [key: string]: string };
}

interface IState {}

export class Cover extends Component<IProps, IState> {
	render() {
		return (
			<div className="cover page" style={this.props.customStyle}>
				<h2>{this.props.text}</h2>
			</div>
		);
	}
}
