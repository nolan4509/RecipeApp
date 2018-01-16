import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap-theme.css';
import { render } from 'react-dom';
import Main from './routes';
import { BrowserRouter } from 'react-router-dom'
//import registerServiceWorker from './registerServiceWorker';
//(at bottom) registerServiceWorker();

render((
    <BrowserRouter>
        <Main />
    </BrowserRouter>
), document.getElementById('root'));


