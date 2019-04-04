import React, {
    Component
} from 'react';
import Recipes from '../Components/Recipes/Recipes';
import {
    auth
} from '../firebase.js';
import './login.css';

require('firebase/auth');

class QuickFixPage extends Component {
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

    getQuickRecipes() {
        fetch(`/recipes`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then((result) => {
            console.log('Success: ' + result);
            let quickArray = [];
            result.map(recipe => {
                if (this.isQuickFix(recipe)) {
                    quickArray.push(recipe);
                }
            });
            this.setState({
                recipesLoaded: 'True',
                recipes: quickArray
            })
        }).catch((error) => {
            console.log('In FavoriteRecipesPage.js -- Error: ' + error);
        });
    }

    handleViewRecipe(id) {
        this.props.history.replace(`/Recipe/${id}`);
    }

    //Filter through all recipes and displayt those with total cook time at 20 minutes or under
    isQuickFix(recipe) {
        let timeArray = recipe.cookTime.split(",");
        if ((parseInt(timeArray[0]) == 0) && (parseInt(timeArray[2]) == 0)) {
            if ((parseInt(timeArray[1]) + parseInt(timeArray[3])) <= 20) { // maximum time in minutes
                return true;
            }
        }

        return false;
    }

    componentDidMount() {
        this.getQuickRecipes();
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

export default QuickFixPage;