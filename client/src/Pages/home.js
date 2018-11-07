import React, {
    Component
} from 'react';
import './home.css';
import {
    auth,
    provider
} from '../firebase.js';
import NavBar from '../Components/NavBar/NavBar';
// import MainNavBar from '../Components/NavBar/MainNavBar';
import RecipesPage from './RecipesPage';

class Home extends Component {
    constructor(props) {
        super(props)
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.toggle = this.toggle.bind(this);
        this.state = {
            userID: '',
            userName: '',
            userEmail: '',
            userRecipes: [],
            user: null,
            submissionStatus: '',
            isOpen: false
        }
    }

    /*
    call the 'signOut' method on auth, and then using the Promise API
    we remove the user from our application's state. With 'this.state.user'
    now equal to null, the user will see the Log In button instead of the Log Out button.
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
    Here call the 'signInWithPopup' method from the auth module,
    and pass in our 'provider' Now when you click the 'login'
    button, it will trigger a popup that gives up the option to
    sign in with a google account

    'signInWithPopup' has a promise API that allows us to call '.then' on it and pass in a callback.
    This callback will be provided with a 'result' object that contains, among other things, a
    property called '.user' that has all the information about the user who just signed in, we then
    store this inside of the state using 'setState'
    */
    login() {
        auth.signInWithPopup(provider).then((result) => {
            const user = result.user;
            this.setState({
                user
            });
        });
        this.props.history.push('/home')
    }

    handleChangeEmail(event) {
        this.setState({
            email: event.target.value,
            userID: event.target.value.substr(0, event.target.value.indexOf('@'))
        })
    }

    handleChangeName(event) {
        this.setState({
            userName: event.target.value
        })
    }

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

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (<div>
            <head>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"/>
                <link rel="stylesheet" href="home.css"/>
            </head>
            <NavBar/>
            {
                this.state.user
                    ? <div className="backgroundStyle">
                        {/* <NavBar/> */}
                        <RecipesPage/>
                        <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.logout}>Log Out</button>
                    </div>
                    : <div className="backgroundStyle">
                        {/* <NavBar/> */}
                    <div className="container">
                            <form className="box">
                                <h2 className="big">Please Login</h2>
                                <div className="inputBox">
                                    <label htmlFor="inputEmail" className="sr-only inputBox">Email address</label>
                                    {/* FOR BELOW note: for later can have them hit enter for user+pass combo, and button for google value={userEmail} */}
                                    {/* onChange={event => this.setState(byPropKey('userEmail', event.target.value))} */}
                                    <input type="email" id="inputEmail" placeholder="Email address" required="required" autoFocus="autofocus"/>
                                </div>
                                <div className="inputBox">
                                    <label htmlFor="inputPassword" className="sr-only inputBox">Password</label>
                                    {/* FOR BELOW value={userPassword} */}
                                    {/* onChange={event => this.setState(byPropKey('userPassword', event.target.value))} */}
                                    <input type="password" id="inputPassword" placeholder="Password" required="required"/>
                                </div>
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" value="remember-me"/>
                                        Remember me (Todo)
                                    </label>
                                </div>
                                <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.login}>Log In</button>
                            </form>
                            {/* Add another form here, consisting of just a button(?) that onClick -> googleLogin, and make 'login' for user&password */}
                        </div>
                    </div>
            }
            </div>);
    }
}

export default Home;