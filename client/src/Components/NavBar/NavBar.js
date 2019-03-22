import React, {
    Component
} from 'react';
import './NavBar.css';
//import {Link} from 'react-router-dom';


//This class will need to be worked on post 1.0
class NavBar extends Component {

    render() {
        return (<nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">F the Microwave</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="/">Home
                            <span className="sr-only">(current)</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/NewRecipe">New Recipe</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/Recipes/favorites">Favorites</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/Recipes/all">All Recipes</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/Recipes/quick">Quick Fix</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" href="/" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Don't Click
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="/Recipes/breakfast">Breakfast</a>
                            <a className="dropdown-item" href="/Recipes/lunch">Lunch</a>
                            <a className="dropdown-item" href="/Recipes/dinner">Dinner</a>
                            <a className="dropdown-item" href="/Recipes/desserts">Desserts</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="/Recipes/easy">Easy</a>
                            <a className="dropdown-item" href="/Recipes/medium">Medium</a>
                            <a className="dropdown-item" href="/Recipes/hard">Hard</a>
                        </div>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" disabled/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit" disabled>Search</button>
                </form>
            </div>
        </nav>);
    }
}

export default NavBar;