import * as React from 'react';
import { Component } from 'react';
import { Cover } from '../elements/cover';
import { Section } from '../elements/section';
import { store } from '../../../store';

export class Chapter1 extends Component {
	render() {
		const text = '量子ビット';

		const style0 = {
			background: store.getState().app.isDebug ? 'rgba(0, 255, 0, 0.3)' : '',
			marginBottom: '200px'
		};
		return (
			<>
				<Cover text={text} customStyle={style0} />
				<Section text={'section0'} />
				<Section text={'section1'} />
			</>
		);
	}
}
