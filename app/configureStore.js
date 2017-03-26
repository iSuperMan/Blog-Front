import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import { apiMiddleware } from 'redux-api-middleware';
import reducers from './reducers';

export default (history) => {
	let middlewares = [
		apiMiddleware,
		thunkMiddleware,
		routerMiddleware(history),
	];

	if (process.env.NODE_ENV !== 'production') {
		middlewares = [...middlewares, createLogger()];
	}

	const store = createStore(
		reducers,
		applyMiddleware(...middlewares),
	);

	return store;
};
