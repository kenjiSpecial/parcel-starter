import * as React from 'react';
import { Component } from 'react';
import { Cover } from '../elements/cover';
import { COVER_TRANS } from '../../../utils/constants';
import { store } from '../../../store';

export class Top extends Component {
	render() {
		const text = '量子コンピュータ入門';

		const style0 = {
			background: store.getState().app.isDebug ? 'rgba(255, 0, 0, 0.3)' : '',
			marginBottom: `${COVER_TRANS}px`
		};
		return (
			<div className="fullSize" style={style0}>
				<Cover text={text} />
			</div>
		);
	}
}
