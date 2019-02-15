import React from 'react';
import App from './App';
import {
    render
} from 'react-dom';
import {
    Router
} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import history from './history';
import 'bootstrap/dist/css/bootstrap.css';

render((<Router history={history}>
    <App/>
</Router>), document.getElementById('root'));
registerServiceWorker(); //Could this be affecting login?