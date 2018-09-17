import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//import 'bootstrap/dist/css/bootstrap-theme.css';
import {render} from 'react-dom';
import Main from './routes';
import {BrowserRouter} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

render((<BrowserRouter>
    <Main/>
</BrowserRouter>), document.getElementById('root'));
registerServiceWorker();
