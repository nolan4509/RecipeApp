import React, {
    Component
} from 'react';
import Recipes from '../Components/Recipes/Recipes';
import RecipePopUpView from '../Components/RecipePopUpView/RecipePopUpView';
import './styles.css';

class RecipesPage extends Component {

    constructor(props) {
        super(props)
        this.handleViewRecipe = this.handleViewRecipe.bind(this);
        this.handleDeleteRecipe = this.handleDeleteRecipe.bind(this);
        this.state = {
            userID: '',
            recipes: [],
            currentRecipe: false
        }
    }

    getRecipes() {
        fetch(`/recipes/user/${this.props.currentUserID}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then((result) => {
            // console.log('Success: ' + result);
            this.setState({
                recipes: result
            })
        }).catch((error) => {
            console.log('Error: ' + error);
        });
    }

    componentDidMount() {
        // console.log('in recipespage.js: ');
        // console.log(this.props.currentUserID);
        this.setState({
            userID: this.props.currentUserID
        })
        this.getRecipes();
    }

    handleDeleteRecipe(id) {
        // id.preventDefault();
        console.log('trying to delete');
        fetch(`/recipes/remove/${id}`, {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            console.log(res);
            // Currently you must refresh the page after deleting something...
            // let recipes = this.state.recipes;
            // let index = recipes.findIndex(x => x.id === id);
            // recipes.splice(index, 1);
            // this.setState({
            //     recipes: recipes
            // })
        });
    }

    handleViewRecipe(id) {
        fetch(`/recipes/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then((result) => {
            console.log('Success: ' + result);
            this.setState({
                currentRecipe: true
            })
        }).catch((error) => {
            console.log('Error: ' + error);
        });
    }

    render() {
        let recipeItems;
        if (this.state.recipes) {
            recipeItems = this.state.recipes.map(recipe => {
                return (<RecipePopUpView key={recipe.name} recipe={recipe}/>);
            });
        }
        return (<div className = "bodyStyle">
            <br/>
            <Recipes recipes={this.state.recipes} onDelete={this.handleDeleteRecipe.bind(this.state.recipes.recipeID)} onView={this.handleViewRecipe.bind(this.state.recipes.recipeID)} currentUserID={this.props.currentUserID}/>
            {
                this.state.currentRecipe ? <div className="row rowSpacing">{recipeItems}</div> : <div/>
            }
        </div>);
    }
}

export default RecipesPage;