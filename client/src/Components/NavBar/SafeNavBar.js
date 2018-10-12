import React, {
    Component
} from 'react';
import './NavBar.css';
//import {Link} from 'react-router-dom';

class SafeNavBar extends Component {
    render() {
        return (<nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="Home.html">Fuck the Microwave</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/home">Home
                            <span className="sr-only">(current)</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/NewRecipe">New Recipe</a>
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
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="RecipeInfo.html" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="RecipeInfo.html">Action</a>
                            <a className="dropdown-item" href="RecipeInfo.html">Another action</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="RecipeInfo.html">Something else here</a>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/">Login</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/Recipes">Recipes</a>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>);
    }
}

export default SafeNavBar;