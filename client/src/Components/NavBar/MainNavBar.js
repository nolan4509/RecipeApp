import React, {Component} from 'react';
import './styles.css';
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
    Button,
    DropdownItem,
    DropdownToggle,
    DropdownMenu,
    UncontrolledDropdown,
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
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" href="Home.html">Home
                                <span class="sr-only">(current)</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="NewRecipe.html">New Recipe</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="RecipeInfo.html">Favorites</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Quick Fix</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Breakfast</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Lunch</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Dinner</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Desserts</a>
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