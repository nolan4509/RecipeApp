import React, {Component} from 'react';
import './login.css';
import {auth, provider} from '../firebase.js';

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
        auth.signOut().then(() => {
            this.setState({user: null});
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
        /*
      auth.doSignInWithEmailAndPassword(userEmail, userPassword)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(routes.HOME);
      })
      */
        auth.signInWithPopup(provider).then((result) => {
            const user = result.user;
            this.setState({user});
            this.props.history.push('/home')
        });
    }

    /*  From TextBook App
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
    */

    handleChangeEmail(event) {
        this.setState({
            userEmail: event.target.value,
            userID: event.target.value.substr(0, event.target.value.indexOf('@'))
        })
    }

    handleChangeName(event) {
        this.setState({userName: event.target.value})
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({user}); // When user signs in, checks the firebase database to see
                // if they were already previously authenticated, if so, restore
            }
        });
    }

    render() {
        return (<div>
            {/* Login */}

            {/* Required meta tags */}
            <meta charSet="utf-8"/> {/* <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" /> */}
            {/* Bootstrap CSS */}
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"/>
            <link rel="stylesheet" href="styles.css"/>
            <title>Login Page</title>
            {/* <header>
                <h1 className="big">Home</h1>
                <div>
                    <button id="myBooksButton" onClick={this.sellerHubClick}
                            data-tip data-for='myBooksTip'>
                        My Books
                    </button>
                    <ReactTooltip id='myBooksTip' aria-haspopup='true' border={true} effect='solid' place='bottom'>
                        <font size='3'> This will bring you to your page where you can see all of the current books
                            you are trying to sell.</font><br/><br/>
                        <font size='3'> From here, you can update, remove, or add a new book post to sell.</font>
                    </ReactTooltip>
                    <button id="searchCoursesButton" onClick={this.courseHubClick}
                    data-tip data-for='searchCoursesTip'>
                        Search Courses
                    </button>
                    <ReactTooltip id='searchCoursesTip' aria-haspopup='true' border={true} effect='solid' place='right'>
                        <font size='3'> This will bring you to the course hub page, where you can search for whatever course
                            you need books for.</font><br/><br/>
                        <font size='3'> Once you click search, you will see all available books for that course. Then just find the
                            book you need and click on the email seller button next to it.</font>
                    </ReactTooltip>
                </div>
              </header> */
            }
            <body>
                {
                    this.state.user
                        ? <div>
                                <div className="user-profile">
                                    <img src={this.state.user.photoURL} alt="userPhoto"/>
                                    <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.logout}>Log Out</button>
                                </div>
                            </div>
                        : <div className="container">
                                <form className="form-signin">
                                    <h2 className="big">Please Login :)</h2>
                                    <label for="inputEmail" className="sr-only">Email address</label>
                                    {/* FOR BELOW note: for later can have them hit enter for user+pass combo, and button for google value={userEmail} */}
                                    {/* onChange={event => this.setState(byPropKey('userEmail', event.target.value))} */}
                                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required="required" autofocus="autofocus"/>
                                    <label for="inputPassword" className="sr-only">Password</label>
                                    {/* FOR BELOW value={userPassword} */}
                                    {/* onChange={event => this.setState(byPropKey('userPassword', event.target.value))} */}
                                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required="required"/>
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
                }</body>
        </div>);
    }
}

export default Login;
