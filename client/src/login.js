import React, { Component } from 'react';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import './Login.css';


class Login extends Component {
    constructor(props) {
        super(props)
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.state = {
            userID: '',
            userName: '',
            email: '',
            submissionStatus: ''
        }
    }

    homeClick = () => {
        this.props.history.push("/home")
    }

    login = () => {

        fetch(`/add/user/${this.state.userName}/${this.state.userID}/${this.state.email}`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        }).then(
            this.setState({
                submissionStatus: `Welcome`
            }))
            .catch((ex) => {
                console.log('parsing failed', ex)
            })

        this.props.history.push("/home")
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


    render() {
        return (
            <div>
                {/* Login */}
                <meta charSet="utf-8"/>
                <title>Login</title>
                <body>
                    <div class="container">
                        <form class="form-signin">
                            <h2 class="form-signin-heading">Please sign in</h2>
                            <label for="inputEmail" class="sr-only">Email address</label>
                            <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus/>
                            <label for="inputPassword" class="sr-only">Password</label>
                            <input type="password" id="inputPassword" class="form-control" placeholder="Password" required/>
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" value="remember-me"/> Remember me
                                </label>
                            </div>
                            <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                        </form>

                    </div>
                </body>
            </div>
        );
    }
}

export default Login;