import React, {
    Component
} from 'react';
import Recipes from '../Components/Recipes/Recipes';

// importing firebase for image and recipe database access

class RecipesPage extends Component {

    constructor(props) {
        super(props)
        this.handleViewRecipe = this.handleViewRecipe.bind(this);
        this.handleDeleteRecipe = this.handleDeleteRecipe.bind(this);
        // STATE
        this.state = {
            userID: '',
            recipes: [],
        }
    }

    /*
     ** Calls GET '/recipes/user/:userID' and sets the array returned as state.recipes
     */
    getRecipes() {
        fetch(`/recipes/user/${this.props.currentUserID}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then((result) => {
            console.log('Success: ' + result);
            this.setState({
                recipes: result
            })
        }).catch((error) => {
            console.log('In RecipesPage.js -- Error: ' + error);
        });
    }

    // Sets state.userID and executes getRecipes()
    componentDidMount() {
        this.setState({
            userID: this.props.currentUserID
        })
        this.getRecipes();
    }

    /*
     ** Calls DELETE '/recipes/remove/:recipeID'
     */
    handleDeleteRecipe(id) {
        // id.preventDefault();
        fetch(`/recipes/remove/${id}`, {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).catch((error) => {
            console.log('In RecipesPage.js -- Error: ' + error);
        });
    }

    /*
     ** Navigates user to a full page view of the Recipe with the specified id
     */
    handleViewRecipe(id) {
        this.props.history.push(`/Recipe/${id}`);
    }

    render() {
        return (<div>
            <Recipes recipes={this.state.recipes} onDelete={this.handleDeleteRecipe.bind(this.state.recipes.recipeID)} onView={this.handleViewRecipe.bind(this.state.recipes.recipeID)} currentUserID={this.props.currentUserID}/>
        </div>);
    }
}

export default RecipesPage;