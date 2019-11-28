import * as React from 'react';
import { Component } from 'react';
import { Cover } from '../elements/cover';
import { SECTION_TOP, SECTION_TRANS } from '../../../utils/constants';
import { store } from '../../../store';

interface IProps {
	text: string;
}

interface IState {}

export class Section extends Component<IProps, IState> {
	render() {
		const styleTop = {
			width: '100%',
			height: SECTION_TOP,
			background: store.getState().app.isDebug ? 'rgba(255, 255, 0, 0.3)' : ''
		};

		const styleBot = {
			width: '100%',
			height: SECTION_TOP,
			background: store.getState().app.isDebug ? 'rgba(255, 0, 255, 0.3)' : ''
		};
		const mainStyle = { marginBottom: `${SECTION_TRANS}px` };
		return (
			<div className="section page" style={mainStyle}>
				<div style={styleTop} />
				<div>{this.props.text}</div>
				<div style={styleBot} />
			</div>
		);
	}
}
