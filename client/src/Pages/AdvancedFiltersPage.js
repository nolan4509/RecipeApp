import React, {
    Component
} from 'react';
import Recipes from '../Components/Recipes/Recipes';
import {
    auth
} from '../firebase.js';
import './login.css';

// importing firebase for image and recipe database access

require('firebase/auth');

class AdvancedFiltersPage extends Component {
    constructor(props) {
        super(props)
        this.handleViewRecipe = this.handleViewRecipe.bind(this);
        // STATE
        this.state = {
            recipesLoaded: 'False',
            recipes: [],
            user: null,
            userID: ''
        }
    }

    getRecipes() {
        let filters = this.setupFilters();
        let reqBody = {
            category: filters[0],
            cuisine: filters[1],
            difficulty: filters[2],
            cookTime: filters[3],
            vegetarian: filters[4],
            vegan: filters[5],
            glutenFree: filters[6],
        }

        fetch('/recipes/filters', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'GET',
            body: JSON.stringify(reqBody)
        }).then(res => res.json()).then((result) => {
            console.log('success!');
            this.setState({
                recipesLoaded: 'true',
                recipes: result
            })
        })
    }

    setupFilters() {
        let filters = [];
        return filters;
    }

    /*
     ** Navigates user to a full page view of the Recipe with the specified id
     */
    handleViewRecipe(id) {
        this.props.history.replace(`/Recipe/${id}`);
    }


    render() {
        return (<div className="backgroundStyle">
            {this.state.userID
                ? <Recipes recipes={this.state.recipes} onView={this.handleViewRecipe.bind(this.state.recipes.recipeID)} currentUserID={this.state.userID}/>
                : <Recipes recipes={this.state.recipes} onView={this.handleViewRecipe.bind(this.state.recipes.recipeID)}/>
        }
        </div>);
    }
}

export default AdvancedFiltersPage;