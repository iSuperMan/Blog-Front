import 'babel-polyfill';
import 'isomorphic-fetch';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import configureStore from './configureStore';
import App from './components/App';
import './assets/global.css';

const history = createHistory();
const store = configureStore(history);

render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<MuiThemeProvider>
				<App />
			</MuiThemeProvider>
		</ConnectedRouter>
	</Provider>,

	document.getElementById('app'),
);
