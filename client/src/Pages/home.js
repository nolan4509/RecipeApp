import React, {Component} from 'react';
import './home.css';
import {auth, provider} from '../firebase.js';
import {
    // Collapse,
    // Navbar,
    // NavbarToggler,
    // NavbarBrand,
    // Nav,
    // NavItem,
    // NavLink,
    Container,
    Row,
    Col,
    Button,
    // DropdownItem,
    // DropdownToggle,
    // DropdownMenu,
    // UncontrolledDropdown,
    // Form,
    // Input,
    // InputGroup,
    // InputGroupAddon,
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle
} from 'reactstrap';
import SafeNavBar from '../Components/NavBar/SafeNavBar';
// import MainNavBar from '../Components/NavBar/MainNavBar';
import TestComponent from '../Components/TestComponent/TestComponent';

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
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous"/>
                <link rel="stylesheet" href="home.css"/>
            </head>
            {/* Home Page to be infinite scrolling, subcategories will have pagination */}
            <SafeNavBar/>
            <TestComponent/> {
                this.state.user
                    ? <Container>
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
                            <Row className="row rowSpacing">
                                <Col md="4" className="border border-warning rounded m-2 homepage-recipe-tile tileStyleA">
                                    <Card style={{
                                            backgroundColor: '#ffd38b'
                                        }}>
                                        <CardImg className="img-thumbnail mx-auto d-block" top="top" width="200" height="200" src="images/chickun.jpg" alt="ChickenSaladImage"/>
                                        <CardBody>
                                            <CardTitle>Chicken Salad</CardTitle>
                                            <CardSubtitle>serves: 4 | cook time: 20 minutes</CardSubtitle>
                                            <CardText>Dinner Meal</CardText>
                                            <Button>Button</Button>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md="4" className="border border-warning rounded m-2 homepage-recipe-tile tileStyleB">
                                    <Card style={{
                                            backgroundColor: '#ffc57e'
                                        }}>
                                        <CardImg className="img-thumbnail mx-auto d-block" top="top" width="200" height="200" src="images/eeffreef.jpg" alt="HoneyPotGarlicImage"/>
                                        <CardBody>
                                            <CardTitle>Instant Pot Honey Garlic Chicken</CardTitle>
                                            <CardSubtitle>serves: 4 | cook time: 30 minutes</CardSubtitle>
                                            <CardText>Dinner Meal</CardText>
                                            <Button>Button</Button>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col md="4" className="border border-warning rounded m-2 homepage-recipe-tile tileStyleA">
                                    <Card style={{
                                            backgroundColor: '#ffd38b'
                                        }}>
                                        <CardImg className="img-thumbnail mx-auto d-block" top="top" width="200" height="200" src="images/theGeneralsChicken.jpg" alt="GeneralTsosChickenImage"/>
                                        <CardBody>
                                            <CardTitle>General Tso’s Chicken</CardTitle>
                                            <CardSubtitle>serves: 8 | cook time: 40 minutes</CardSubtitle>
                                            <CardText>Dinner Meal</CardText>
                                            <Button>Button</Button>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.logout}>Log Out</button>
                        </Container>
                    : <div className="container">
                        {/* This is displayed if the user isn't logged in. */
                        }
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
            </div>);
    }
}

export default Home;
