import * as React from 'react';
import { Component } from 'react';
import { Counter } from '../Counter/Counter';
import { store } from '../../store/index';
import { getData, IData } from '../../store/asssets';
import { setPageData } from '../../store/page/actions';

interface IState {
	isLoading: boolean;
}

export class App extends Component<{}, IState> {
	constructor(params = {}) {
		super(params);

		this.state = {
			isLoading: true
		};
	}
	componentDidMount() {
		store.dispatch(getData());
		store.subscribe(onChange);

		let currentData: IData;

		let self = this;
		function onChange() {
			// currentState
			let prevData = currentData;
			currentData = store.getState().assets.data;

			self.setState({ isLoading: store.getState().assets.isJsonLoading });

			if (prevData !== currentData) {
				// self.
				const chNum = currentData.chapters.length;
				const sectionNumArr = [];
				for (let ii = 0; ii < chNum; ii = ii + 1) {
					const chapter = currentData.chapters[ii];
					sectionNumArr.push(chapter.sections.length);
				}

				store.dispatch(
					setPageData({
						ch: chNum,
						section: sectionNumArr
					})
				);
			}
		}
	}

	render() {
		const isLoading = this.state.isLoading;

		if (isLoading) {
			return <div>loading</div>;
		} else {
			return <Counter superhero="test" />;
		}
	}
}
