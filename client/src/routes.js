import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './home'
import Login from './login'

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Login}/>
            <Route path='/home' component={Home}/>
        </Switch>
    </main>
)

export default Main;