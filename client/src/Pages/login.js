import React, {
    Component
} from 'react';
import './login.css';
import {
    auth,
    provider
} from '../firebase.js';
import NavBar from '../Components/NavBar/NavBar';
import RecipesPage from './RecipesPage';
require('firebase/auth');

class Login extends Component {
    constructor(props) {
        super(props)
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.state = {
            realUserID: '',
            userID: '',
            userName: '',
            userEmail: '',
            userPassword: '',
            userRecipes: [],
            user: null,
            submissionStatus: '',
        }
    }

    logout() {
        auth.signOut().then(() => {
            // sessionStorage.removeItem("uid");
            this.setState({
                user: null
            });
        });

        this.props.history.push('/')
    }

    login() {
        auth.signInWithPopup(provider).then((result) => {
            const user = result.user;
            this.setState({
                user
            });
            this.props.history.push('/')
        });
    };

    handleChangeEmail(event) {
        this.setState({
            userEmail: event.target.value,
            userID: event.target.value.substr(0, event.target.value.indexOf('@'))
        })
    }

    handleChangePassword(event) {
        this.setState({
            userPassword: event.target.value
        })
    }

    handleChangeName(event) {
        this.setState({
            userName: event.target.value
        })
    }

    componentDidMount() {
        // console.log('session storage: ' + sessionStorage.getItem("uid"));
        // console.log(firebase.auth().currentUser.uid);
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    user
                }); // When user signs in, checks the firebase database to see
                // if they were already previously authenticated, if so, restore
            }
        });
    }

    render() {
        return (<div>
            <div>
                <NavBar/>
                {
                    this.state.user
                        ? <div className="backgroundStyle">
                                <RecipesPage history={this.props.history} currentUserID={auth.currentUser.uid}/>
                                <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.logout}>Log Out</button>
                            </div>
                        : <div>
                            {/* <NavBar/> */}
                        <div className="backgroundStyle">
                            <div className="container">
                                <form className="box">
                                    <h2 className="big">Please Login</h2>
                                    <div className="inputBox">
                                        <label htmlFor="inputEmail" className="sr-only inputBox">fix this</label>
                                        <input type="email" id="inputEmail" placeholder="Email address (WIP)" required="required" autoFocus="autofocus" value={this.state.userEmail} onChange={this.handleChangeEmail}/>
                                    </div>
                                    <div className="inputBox">
                                        <label htmlFor="inputPassword" className="sr-only">fix this</label>
                                        <input type="password" id="inputPassword" placeholder="Password (WIP)" required="required" value={this.state.userPassword} onChange={this.handleChangePassword}/>
                                    </div>
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" ref="rememberMe" id="rememberMeField" name="rememberMeField"/>
                                        </label>
                                    </div>
                                    <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.login}>Log In with Google Account</button>
                                </form>
                            </div>
                                {/* Add another form here, consisting of just a button(?) that onClick -> googleLogin, and make 'login' for user&password */}
                            </div>
                        </div>
                }</div>
        </div>);
    }
}

export default Login;