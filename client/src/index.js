import React from 'react';
import App from './App';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';

render((<BrowserRouter>
    <App/>
</BrowserRouter>), document.getElementById('root'));
registerServiceWorker();
