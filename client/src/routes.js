import React from 'react'
import { Switch, Route } from 'react-router-dom'
import SellerHub from './sellerHub'
import Home from './Home'
import AddBook from './addBook'
import CourseHub from './courseHub'
import Login from './login'

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Login}/>
            <Route path='/sellerHub' component={SellerHub}/>
            <Route path='/addBook' component={AddBook}/>
            <Route path='/courseHub' component={CourseHub}/>
            <Route path='/home' component={Home}/>
        </Switch>
    </main>
)

export default Main