import React, { Component } from 'react';
import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase, { auth, provider } from './firebase.js';
import './Login.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import styles from './Login.css';
//import './App.css';
//import ReactTooltip from 'react-tooltip';

class Home extends Component {
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
        auth.signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                this.setState({
                    user
                });
            });
        this.props.history.push('/home')
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
              {/* Home */}

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
              </header> */}
              <body>
              {this.state.user ?
                <div>
                  <div className="container">
                		<div className="row" style="margin-bottom: 15px;">
                			<div className="col-md border border-warning rounded m-2 homepage-recipe-tile" style="margin-bottom: 10px; background-color: #ffd38b;">
                	  			<h1>Chicken Salad</h1>
                				<img src="images/chickun.jpg" alt="ChickenSaladImage" className="img-thumbnail mx-auto d-block" width="200" height="200"/>
                				<h4>serves: 4 | cook time: 20 minutes</h4>
                			</div>
                			<div className="col-md border border-warning rounded m-2 homepage-recipe-tile" style="margin-bottom: 10px; background-color: #ffc57e;">
                				<div className="homepage-recipe-tile">
                		  			<h1>Instant Pot Honey Garlic Chicken</h1>
                					<img src="images/eeffreef.jpg" alt="HoneyPotGarlicImage" className="img-thumbnail mx-auto d-block" width="200" height="200"/>
                					<h4>serves: 4 | cook time: 30 minutes</h4>
                				</div>
                			</div>
                		    <div className="col-md border border-warning rounded m-2 homepage-recipe-tile" style="margin-bottom: 10px; background-color: #ffd38b;">
                		    	<div className="homepage-recipe-tile">
                		      		<h1>General Tso’s Chicken</h1>
                					<img src="images/theGeneralsChicken.jpg" alt="GeneralTsosChickenImage" className="img-thumbnail mx-auto d-block" width="200" height="200"/>
                					<h4>serves: 8 | cook time: 40 minutes</h4>
                				</div>
                		    </div>
                		</div>
                		<div className="row" style="margin-bottom: 15px;">
                			<div className="col-md border border-warning rounded m-2 homepage-recipe-tile" style="margin-bottom: 10px; background-color: #ffc57e;">
                	  			<h1>Chicken Salad</h1>
                				<img src="images/chickun.jpg" alt="ChickenSaladImage" className="img-thumbnail mx-auto d-block" width="200" height="200"/>
                				<h4>serves: 4 | cook time: 20 minutes</h4>
                			</div>
                			<div className="col-md border border-warning rounded m-2 homepage-recipe-tile" style="margin-bottom: 10px; background-color: #ffd38b;">
                				<div className="homepage-recipe-tile">
                		  			<h1>Instant Pot Honey Garlic Chicken</h1>
                					<img src="images/eeffreef.jpg" alt="HoneyPotGarlicImage" className="img-thumbnail mx-auto d-block" width="200" height="200"/>
                					<h4>serves: 4 | cook time: 30 minutes</h4>
                				</div>
                			</div>
                		    <div className="col-md border border-warning rounded m-2 homepage-recipe-tile" style="margin-bottom: 10px; background-color: #ffc57e;">
                		    	<div className="homepage-recipe-tile">
                		      		<h1>General Tso’s Chicken</h1>
                					<img src="images/theGeneralsChicken.jpg" alt="GeneralTsosChickenImage" className="img-thumbnail mx-auto d-block" width="200" height="200"/>
                					<h4>serves: 8 | cook time: 40 minutes</h4>
                				</div>
                		    </div>
                		</div>
                		<div className="row" style="margin-bottom: 15px;">
                			<div className="col-md border border-warning rounded m-2 homepage-recipe-tile" style="margin-bottom: 10px; background-color: #ffd38b;">
                	  			<h1>Chicken Salad</h1>
                				<img src="images/chickun.jpg" alt="ChickenSaladImage" className="img-thumbnail mx-auto d-block" width="200" height="200"/>
                				<h4>serves: 4 | cook time: 20 minutes</h4>
                			</div>
                			<div className="col-md border border-warning rounded m-2 homepage-recipe-tile" style="margin-bottom: 10px; background-color: #ffc57e 	;">
                				<div className="homepage-recipe-tile">
                		  			<h1>Instant Pot Honey Garlic Chicken</h1>
                					<img src="images/eeffreef.jpg" alt="HoneyPotGarlicImage" className="img-thumbnail mx-auto d-block" width="200" height="200"/>
                					<h4>serves: 4 | cook time: 30 minutes</h4>
                				</div>
                			</div>
                		    <div className="col-md border border-warning rounded m-2 homepage-recipe-tile" style="margin-bottom: 10px; background-color: #ffd38b;">
                		    	<div className="homepage-recipe-tile">
                		      		<h1>General Tso’s Chicken</h1>
                					<img src="images/theGeneralsChicken.jpg" alt="GeneralTsosChickenImage" className="img-thumbnail mx-auto d-block" width="200" height="200"/>
                					<h4>serves: 8 | cook time: 40 minutes</h4>
                				</div>
                		    </div>
                		</div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.logout}>Log Out</button>
                  </div>
                </div>
                :
                <div className="container">
                  <form className="form-signin">
                      <h2 className="big">Please Login :)</h2>
                      <label for="inputEmail" className="sr-only">Email address</label>
                      {/* FOR BELOW note: for later can have them hit enter for user+pass combo, and button for google value={userEmail} */}
                      {/* onChange={event => this.setState(byPropKey('userEmail', event.target.value))} */}
                      <input
                          type="email"
                          id="inputEmail"
                          className="form-control"
                          placeholder="Email address"
                          required
                          autofocus
                      />
                      <label for="inputPassword" className="sr-only">Password</label>
                      {/* FOR BELOW value={userPassword} */}
                      {/* onChange={event => this.setState(byPropKey('userPassword', event.target.value))} */}
                      <input
                          type="password"
                          id="inputPassword"
                          className="form-control"
                          placeholder="Password"
                          required
                      />
                      <div className="checkbox">
                          <label>
                              <input type="checkbox" value="remember-me"/> Remember me (Todo)
                          </label>
                      </div>
                      <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.login}>Log In</button>
                  </form>
                </div>
              }</body>
            </div>
        );
    }
}

export default Home;
