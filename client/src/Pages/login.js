import React, {
    Component
} from 'react';
import './login.css';
import {
    auth,
    provider
} from '../firebase.js';
import firebase from '../firebase.js';
import RecipesPage from './RecipesPage';

// importing firebase for image and recipe database access
// auth is the authentication service from firebase
// provider is a separate google authentication service used to create a new user using a google account

require('firebase/auth');

class Login extends Component {
    constructor(props) {
        super(props)
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        // STATE
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

    /*
     ** Calls signOut() on auth in order to sign the user out, then navigates to '/'
     */
    logout() {
        auth.signOut().then(() => {
            this.setState({
                user: null
            });
        });
        this.props.history.push('/')
    }

    /*
     ** calls signInWithPopup() from auth to use google's authentication service.  If it is successful it returns a user object
     ** newUser is passed to checkIfFirstLogin()
     */
    login() {
        auth.signInWithPopup(provider).then((result) => {
            var newUser = auth.currentUser;
            this.setState({
                user: newUser
            });
            this.checkIfFirstLogin(newUser);
        });
    }

    /*
     ** Calls GET '/user/:userID'.  If it returns false, the user is not in the database and createUserEntryOnFirebase() is called
     */
    checkIfFirstLogin(newUser) {
        fetch(`/user/${newUser.uid}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'method': 'GET'
        }).then(res => res.json()).then((result) => {
            if (result === false) {
                this.createUserEntryOnFirebase(newUser);
            }
        }).catch((error) => {
            console.log('In login.js -- Error: ' + error);
        });
    }

    /*
     ** Calls POST '/add/user/:userName/:userID/:email' To have the backend create a new user entry on firebase
     */
    createUserEntryOnFirebase(newUser) {
        fetch(`/add/user/${newUser.displayName}/${newUser.uid}/${newUser.email}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            'method': 'POST'
        }).catch((error) => {
            console.log('In login.js -- Error: ' + error);
        });
    }

    // Update state.userEmail and state.userID
    handleChangeEmail(event) {
        this.setState({
            userEmail: event.target.value,
            userID: event.target.value.substr(0, event.target.value.indexOf('@'))
        })
    }

    // Update state.userPassword
    handleChangePassword(event) {
        this.setState({
            userPassword: event.target.value
        })
    }

    // Update state.userName
    handleChangeName(event) {
        this.setState({
            userName: event.target.value
        })
    }

    /*
     ** Calls auth.setPersistence() to persist the login in between sessions
     */
    rememberUser() {
        auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .catch(function(error) {
                console.log('Error inside login.js-rememberUser(): ' + error.code + ' ' + error.message);
            });
    }

    /*
     ** uses auth to check if a user is signed in, then executes getRecipes()
     */
    componentDidMount() {
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
        return (
            <div className="backgroundStyle">
                {
                    this.state.user
                        ? <div>
                                <RecipesPage history={this.props.history} currentUserID={auth.currentUser.uid}/>
                                <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.logout}>Log Out</button>
                            </div>
                        :
                        <div className="container ">
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
                                        <input type="checkbox" ref="rememberMe" id="rememberMeField" name="rememberMeField" onClick={this.rememberUser}/>
                                    </label>
                                </div>
                                <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.login}>Log In with Google Account</button>
                            </form>
                        </div>
                }</div>
        );
    }
}

export default Login;