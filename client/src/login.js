import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../style.css';
import * as Mousetrap from "mousetrap";

class Login extends Component {
    constructor(props) {
        super(props)
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.wipeFields = this.wipeFields.bind(this)
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
    componentDidMount() {
        Mousetrap.bind(['shift+c shift+l'], this.wipeFields);
    }
    wipeFields(){
        this.setState({
            userName: '',
            email: '',
            userID: '',
            submissionStatus: ''
        })
    }

    render() {
        return (
            <div>
                {/* Login */}
                <meta charSet="utf-8"/>
                <title>Login</title>
                <header>
                    <h1>Sign In</h1>
                </header>
                <br></br>
                <div id="loginForm">
                    <form onSubmit={this.login}>
                        <div>
                            <label htmlFor="userName">First Name: </label>
                            <input id="userName" type="text" placeholder="Ex. 'John'" required
                                value={this.state.userName} onChange={this.handleChangeName}/>
                        </div>
                        <div>
                            <label htmlFor="email">Email: </label>
                            <input id="email" type="email" placeholder="Enter your Email" required
                                value={this.state.email} onChange={this.handleChangeEmail}/>
                        </div>
                        <br/>
                        <div>
                            <label htmlFor="password">Password: </label>
                            <input id="password" type="password" placeholder="Enter your password"/>
                        </div>
                        <br/>
                        <button id="loginButton" className="loginButtons">Sign Up/Login</button>
                    </form>
                    <h3>{this.state.submissionStatus}</h3>
                </div>
            </div>
        );
    }
}

export default Login;