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

// The front end index.js file. The highest point in the Frontend files structure.
// Renders the whole App within a React Router Component with a history property using the history.js file we created.

render((<Router history={history}>
    <App/>
</Router>), document.getElementById('root'));
registerServiceWorker();