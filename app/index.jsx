import 'babel-polyfill';
import 'isomorphic-fetch';

import injectTapEventPlugin from 'react-tap-event-plugin';
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import configureStore from './configureStore';
import App from './containers/App';
import './assets/global.css';

injectTapEventPlugin();

const history = createHistory();
const store = configureStore(history);

const render = (Component) => {
	ReactDOM.render(
		<AppContainer>
			<Provider store={store}>
				<ConnectedRouter history={history}>
					<MuiThemeProvider>
						<Component />
					</MuiThemeProvider>
				</ConnectedRouter>
			</Provider>
		</AppContainer>,
		document.getElementById('app'),
	);
};

render(App);

if (module.hot) {
	module.hot.accept('./containers/App', () => {
		render(App);
	});
}
