import React, {Component} from 'react';
import './styles.css';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    // NavItem,
    // NavLink,
    // Container,
    // Row,
    // Col,
    Button,
    // DropdownItem,
    // DropdownToggle,
    // DropdownMenu,
    // UncontrolledDropdown,
    Form,
    Input,
    InputGroup,
    InputGroupAddon
} from 'reactstrap';
//import {Link} from 'react-router-dom';

class MainNavBar extends Component {
    render() {
        return (<Navbar color="light" light="light" expand="lg" className="navbar navbar-expand-lg navbar-light bg-light">
            <NavbarBrand href="Home.html">
                Fuck the Microwave</NavbarBrand>
            <NavbarToggler onClick={this.toggle}/>
            <Collapse isOpen={this.state.isOpen} navbar="navbar">
                <Nav navbar="navbar">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="Home.html">Home
                                <span className="sr-only">(current)</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="NewRecipe.html">New Recipe</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="RecipeInfo.html">Favorites</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="RecipeInfo.html">Quick Fix</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="RecipeInfo.html">Breakfast</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="RecipeInfo.html">Lunch</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="RecipeInfo.html">Dinner</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="RecipeInfo.html">Desserts</a>
                        </li>

                        <InputGroup>
                            <Form className="form-inline my-2 my-lg-0">
                                <Input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                                <InputGroupAddon addonType="append">
                                    <Button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</Button>
                                </InputGroupAddon>
                            </Form>
                        </InputGroup>
                    </ul>
                </Nav>
            </Collapse>
        </Navbar>);
    }
}

export default MainNavBar;
