import * as React from 'react';
import { render } from 'react-dom';

import { App } from './components/App';
import { checkScroll } from './utils/ReduxStateChecker';

checkScroll();

const rootElement = document.getElementById('root');
render(<App />, rootElement);
