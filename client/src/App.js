import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Pages/home';
import Login from './Pages/login';

const App = () => (<main>
    <Switch>
        <Route exact="exact" path='/' component={Login}/>
        <Route path='/home' component={Home}/>
    </Switch>
</main>)

export default App;
