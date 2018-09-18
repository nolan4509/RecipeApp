import React, {Component} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Row,
    Col,
    Jumbotron,
    Button,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
    UncontrolledDropdown,
    Form,
    Label,
    Input,
    InputGroup,
    InputGroupAddon
} from 'reactstrap';
//import {Navbar, Jumbotron, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import firebase, {auth, provider} from './firebase.js';
import './login.css';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import styles from './home.css';
//import './App.css';
//import ReactTooltip from 'react-tooltip';

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
        auth.signInWithPopup(provider).then((result) => {
            const user = result.user;
            this.setState({user});
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

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (<div className="bodyStyle">
            {/* Home */}
            <head>
                {/* Required meta tags */}
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"/>
                <link rel="stylesheet" href="home.css"/>
                <title>Home Page</title>
            </head>
            {/* Home Page to be infinite scrolling, subcategories will have pagination */}
            <Navbar color="light" light="light" expand="lg">
                <NavbarBrand href="Home.html">
                    <h1>Fuck</h1>Fuck the Mircrowave</NavbarBrand>
                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={this.state.isOpen} navbar="navbar">
                    <Nav className="mr-auto" navbar="navbar">
                        <NavItem>
                            <NavLink href="Home.html">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="NewRecipe.html">New Recipe</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="RecipeInfo.html">Favorites</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="Home.html">Quick Fix</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="Home.html">Breakfast</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="Home.html">Lunch</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="Home.html">Dinner</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="Home.html">Desserts</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav="nav" inNavbar="inNavbar">
                            <DropdownToggle nav="nav" caret="caret">
                                Dropdown
                            </DropdownToggle>
                            <DropdownMenu right="right">
                                <DropdownItem>
                                    Action
                                </DropdownItem>
                                <DropdownItem>
                                    Another Action
                                </DropdownItem>
                                <DropdownItem>
                                    Something else here
                                </DropdownItem>
                                <DropdownItem divider="divider"/>
                                <DropdownItem>
                                    Reset..
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <InputGroup>
                            <Form>
                                <Input type="search" placeholder="Search" aria-label="Search"/>
                                <InputGroupAddon addonType="append">
                                    <Button type="submit">Search</Button>
                                </InputGroupAddon>
                            </Form>
                        </InputGroup>
                    </Nav>
                </Collapse>
            </Navbar>

            {
                this.state.user
                    ? <div>
                            <div className="container">
                                <div className="row rowSpacing">
                                    <div className="col-md border border-warning rounded m-2 homepage-recipe-tile tileStyleA">
                                        <h1>Chicken Salad</h1>
                                        <img src="images/chickun.jpg" alt="ChickenSaladImage" className="img-thumbnail mx-auto d-block" width="200" height="200"/>
                                        <h4>serves: 4 | cook time: 20 minutes</h4>
                                    </div>
                                    <div className="col-md border border-warning rounded m-2 homepage-recipe-tile tileStyleB">
                                        <div className="homepage-recipe-tile">
                                            <h1>Instant Pot Honey Garlic Chicken</h1>
                                            <img src="images/eeffreef.jpg" alt="HoneyPotGarlicImage" className="img-thumbnail mx-auto d-block" width="200" height="200"/>
                                            <h4>serves: 4 | cook time: 30 minutes</h4>
                                        </div>
                                    </div>
                                    <div className="col-md border border-warning rounded m-2 homepage-recipe-tile tileStyleA">
                                        <div className="homepage-recipe-tile">
                                            <h1>General Tso’s Chicken</h1>
                                            <img src="images/theGeneralsChicken.jpg" alt="GeneralTsosChickenImage" className="img-thumbnail mx-auto d-block" width="200" height="200"/>
                                            <h4>serves: 8 | cook time: 40 minutes</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="row rowSpacing">
                                    <div className="col-md border border-warning rounded m-2 homepage-recipe-tile tileStyleB">
                                        <h1>Chicken Salad</h1>
                                        <img src="images/chickun.jpg" alt="ChickenSaladImage" className="img-thumbnail mx-auto d-block" width="200" height="200"/>
                                        <h4>serves: 4 | cook time: 20 minutes</h4>
                                    </div>
                                    <div className="col-md border border-warning rounded m-2 homepage-recipe-tile tileStyleA">
                                        <div className="homepage-recipe-tile">
                                            <h1>Instant Pot Honey Garlic Chicken</h1>
                                            <img src="images/eeffreef.jpg" alt="HoneyPotGarlicImage" className="img-thumbnail mx-auto d-block" width="200" height="200"/>
                                            <h4>serves: 4 | cook time: 30 minutes</h4>
                                        </div>
                                    </div>
                                    <div className="col-md border border-warning rounded m-2 homepage-recipe-tile tileStyleB">
                                        <div className="homepage-recipe-tile">
                                            <h1>General Tso’s Chicken</h1>
                                            <img src="images/theGeneralsChicken.jpg" alt="GeneralTsosChickenImage" className="img-thumbnail mx-auto d-block" width="200" height="200"/>
                                            <h4>serves: 8 | cook time: 40 minutes</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="row rowSpacing">
                                    <div className="col-md border border-warning rounded m-2 homepage-recipe-tile tileStyleA">
                                        <h1>Chicken Salad</h1>
                                        <img src="images/chickun.jpg" alt="ChickenSaladImage" className="img-thumbnail mx-auto d-block" width="200" height="200"/>
                                        <h4>serves: 4 | cook time: 20 minutes</h4>
                                    </div>
                                    <div className="col-md border border-warning rounded m-2 homepage-recipe-tile tileStyleB">
                                        <div className="homepage-recipe-tile">
                                            <h1>Instant Pot Honey Garlic Chicken</h1>
                                            <img src="images/eeffreef.jpg" alt="HoneyPotGarlicImage" className="img-thumbnail mx-auto d-block" width="200" height="200"/>
                                            <h4>serves: 4 | cook time: 30 minutes</h4>
                                        </div>
                                    </div>
                                    <div className="col-md border border-warning rounded m-2 homepage-recipe-tile tileStyleA">
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
                        </div>
            }
            {/* Optional JavaScript */}
            {/* jQuery first, then Popper.js, then Bootstrap JS */}
            <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        </div>);
    }
}

export default Home;
