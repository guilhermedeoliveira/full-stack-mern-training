import React from 'react';
import reactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App';

const store = createStore(() => [], {}, applyMiddleware());

reactDom.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#root')
);
