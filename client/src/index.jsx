import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';
import { Provider } from 'react-redux';
import configureStore from './configureStore';

const Index = () => (
	<App />
)

const store = configureStore();

ReactDOM.render(
	<Provider store = {store}>
		<Index />
	</Provider>,
	document.getElementById('app')
)