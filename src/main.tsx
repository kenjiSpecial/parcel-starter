import * as React from 'react';
import { render } from 'react-dom';
import { App } from './components/App';
import { checkScroll } from './utils/ReduxStateChecker';
import { getUrlParameter } from './utils/function';
import { store } from './store';
import { updateDebugHandler } from './store/app';

checkScroll();

store.dispatch(updateDebugHandler(getUrlParameter('debug')));
const rootElement = document.getElementById('root');
render(<App />, rootElement);
