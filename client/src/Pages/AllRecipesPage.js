import React, {
    Component
} from 'react';
import Recipes from '../Components/Recipes/Recipes';
import {
    auth
} from '../firebase.js';
import './login.css';

require('firebase/auth');

class AllRecipesPage extends Component {

    constructor(props) {
        super(props)
        this.handleViewRecipe = this.handleViewRecipe.bind(this);
        this.state = {
            recipesLoaded: 'False',
            recipes: [],
            user: null,
            userID: ''
        }
    }

    getRecipes() {
        fetch(`/recipes`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then((result) => {
            console.log('Success: ' + result);
            this.setState({
                recipesLoaded: 'True',
                recipes: result
            })
        }).catch((error) => {
            console.log('In AllRecipesPage.js -- Error: ' + error);
        });
    }

    handleViewRecipe(id) {
        this.props.history.replace(`/Recipe/${id}`);
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    user
                }); // When user signs in, checks the firebase database to see
                // if they were already previously authenticated, if so, restore
                this.setState({
                    userID: this.state.user.uid
                })
                this.getRecipes();
            }
        });
    }

    render() {
        return (<div className = "bodyStyle backgroundStyle">
            <br/>
            {this.state.userID
            ? <Recipes recipes={this.state.recipes} onView={this.handleViewRecipe.bind(this.state.recipes.recipeID)} currentUserID={this.state.userID}/>
            : <Recipes recipes={this.state.recipes} onView={this.handleViewRecipe.bind(this.state.recipes.recipeID)}/>
        }
        </div>);
    }
}

export default AllRecipesPage;