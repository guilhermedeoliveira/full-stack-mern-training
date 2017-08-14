import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import reactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

// Dev only axios helper
const axios = require('axios');
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

reactDom.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#root')
);
