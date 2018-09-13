import React, { Component } from 'react';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase, { auth, provider } from './firebase.js';
import './Login.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import styles from './Login.css';


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
    /*
    call the 'signOut' method on auth, and then using the Promise API
    we remove the user from our application's state. With 'this.state.user'
    now equal to null, the user will see the Log In button instead of the Log Out button.
    */
    logout() {
        auth.signOut()
            .then(() => {
                this.setState({
                    user: null
                });
            });
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
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                this.setState({
                    user
                });
            });
        //this.props.history.push('/home')
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
                this.setState({ user }); // When user signs in, checks the firebase database to see
                                        // if they were already previously authenticated, if so, restore
            }
        });
    }

    render() {
      return (
    <div>
      {/* Required meta tags */}
      <meta charSet="utf-8" />
      {/*<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" /> */}
      {/* Bootstrap CSS */}
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />
      <link rel="stylesheet" href="styles.css" />
      <title>Home Page</title>
      {/* Home Page to be infinite scrolling, subcategories will have pagination */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="Home.html">Fuck the Microwave</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="Home.html">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="NewRecipe.html">New Recipe</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="RecipeInfo.html">Favorites</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Quick Fix</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Breakfast</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Lunch</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Dinner</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Desserts</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">Action</a>
                <a className="dropdown-item" href="#">Another action</a>
                <div className="dropdown-divider" />
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
    </div>
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
                    <div className="container">
                        <form className="form-signin">
                            <h2 className="form-signin-heading">Please sign in</h2>
                            <label for="inputEmail" className="sr-only">Email address</label>
                            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus/>
                            <label for="inputPassword" className="sr-only">Password</label>
                            <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
                            <div className="checkbox">
                                <label>
                                    <input type="checkbox" value="remember-me"/> Remember me (Todo)
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
