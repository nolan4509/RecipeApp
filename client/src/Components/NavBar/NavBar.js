import React, {
    Component
} from 'react';
import './NavBar.css';
import Modal from 'react-awesome-modal';
// import AdvancedFilters from '../AdvancedFilters/AdvancedFilters'

//import {Link} from 'react-router-dom';


//This class will need to be worked on post 1.0
class NavBar extends Component {

    constructor(props) {
        super(props)
        // STATE
        this.state = {
            visible: ''
        }
    }

    // Updates state.visible to true
    openModal() {
        this.setState({
            visible: true
        });
    }

    // Updates state.visible to false
    closeModal() {
        this.setState({
            visible: false
        });
    }
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
                        <a className="nav-link" href="/Recipes/quickFix">Quick Fix</a>
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
                        {/* Popup sorta deal -- modal that shows the advanced filters component upon clicking dropdown */}
                        <button className="btn btn-primary" onClick={() => this.openModal()}>
                            Advanced Filters
                        </button>
                        <section>
                            <Modal visible={this.state.visible} width='800' height='500' effect="fadeInUp" onClickAway={() => this.closeModal()}>
                                <form class="px-4 py-3">
                                    <div class="form-dropdown">
                                        <select name="category" multiple>
                                          <option value="breakfast">Breakfast</option>
                                          <option value="lunch">Lunch</option>
                                          <option value="dinner">Dinner</option>
                                          <option value="snack">Snack</option>
                                          <option value="dessert">Dessert</option>
                                        </select>
                                    </div>
                                    <div class="form-dropdown">
                                        <select name="cuisinne" multiple>
                                          <option value="american">American</option>
                                          <option value="asian">Asian</option>
                                          <option value="mexican">Mexican</option>
                                          <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div class="form-dropdown">
                                        <select name="difficulty" multiple>
                                          <option value="easy">Easy</option>
                                          <option value="medium">Medium</option>
                                          <option value="hard">Hard</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <input type="number" placeholder="Cook Time" value={this.state.cooktime}/>
                                    </div>
                                    <div class="form-check">
                                      <input type="checkbox" class="form-check-input" id="dropdownCheck"/>
                                      <label class="form-check-label" for="dropdownCheck">
                                          Vegetarian
                                      </label>
                                    </div>
                                    <div class="form-check">
                                      <input type="checkbox" class="form-check-input" id="dropdownCheck"/>
                                      <label class="form-check-label" for="dropdownCheck">
                                          Vegan
                                      </label>
                                    </div>
                                    <div class="form-check">
                                      <input type="checkbox" class="form-check-input" id="dropdownCheck"/>
                                      <label class="form-check-label" for="dropdownCheck">
                                          Gluten Free
                                      </label>
                                    </div>
                                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                                </form>
                            </Modal>
                        </section>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
        </nav>);
    }
}

export default NavBar;