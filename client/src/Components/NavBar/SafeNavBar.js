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

class SafeNavBar extends Component {
    render() {
        return (<nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="Home.html">Fuck the Microwave</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
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
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>);
    }
}

export default SafeNavBar;
