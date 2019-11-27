import * as React from 'react';
import { Component } from 'react';
import { Cover } from '../elements/cover';
import { COVER_TRANS } from '../../../utils/constants';

export class Top extends Component {
	render() {
		const text = '〇〇入門';

		const style0 = { background: 'rgba(255, 0, 0, 0.3)', marginBottom: '200px'};
		return (
			<div className="fullSize" style={style0} >
				<Cover text={text} />
			</div>
		);
	}
}
