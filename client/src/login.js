import React, { Component } from 'react';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase, { auth, provider } from './firebase.js';
import './Login.css';


class Login extends Component {
    constructor(props) {
        super(props)
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            userID: '',
            userName: '',
            userEmail: '',
            userRecipes: [],
            user: null,
            submissionStatus: ''
        }
    }

    logout() {
        auth.signOut()
            .then(() => {
                this.setState({
                    user: null
                });
            });
    }

    login() {
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                this.setState({
                    user
                });
            });
    }

    handleChangeEmail(event) {
        this.setState({
            email : event.target.value,
            userID : event.target.value.substr(0, event.target.value.indexOf('@'))
        })
    }

    handleChangeName(event) {
        this.setState({
            userName : event.target.value
        })
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
            }
        });
    }

    render() {
        return (
            <div>
                {/* Login */}
                <meta charSet="utf-8"/>
                <title>Login</title>
                <header>
                    <div className="wrapper">
                        <h1>Recipe App</h1>
                        {this.state.user ? 
                            <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.logout}>Log Out</button>
                            :
                            <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.login}>Log In</button>
                        }
                    </div>
                </header>
                <body>
                    {this.state.user ? 
                        <div>
                            <div className="user-profile">
                                <img src={this.state.user.photoURL} />
                            </div>
                        </div>
                        :
                        <div className="wrapper">
                            <p>You must be logged in to see your recipes.</p>
                        </div>
                    }
                    <div class="container">
                        <form class="form-signin">
                            <h2 class="form-signin-heading">Please sign in</h2>
                            <label for="inputEmail" className="sr-only">Email address</label>
                            <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus/>
                            <label for="inputPassword" className="sr-only">Password</label>
                            <input type="password" id="inputPassword" class="form-control" placeholder="Password" required/>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="remember-me"/> Remember me
                                </label>
                            </div>
                            {this.state.user ? 
                                <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.logout}>Log Out</button>
                                :
                                <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.login}>Log In</button>
                            }
                        </form>

                    </div>
                </body>
            </div>
        );
    }
}

export default Login;