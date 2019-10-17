import * as React from "react";
import { Component } from 'react';

import {Counter} from './Counter';

export class App extends Component {
	render() {
		return (
			<Counter superhero="test" />
		);
	}
}
