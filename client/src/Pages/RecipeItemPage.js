import React, {
    Component
} from 'react';
// import Recipes from '../Components/Recipes/Recipes';
import './styles.css';

class RecipeItemPage extends Component {
    constructor(props) {
        super(props);
        this.getRecipe = this.getRecipe.bind(this);
        this.state = {
            recipe: []
        }
    }

    getRecipe() {
        const {
            recipeID
        } = this.props.match.params
        fetch(`/recipes/${recipeID}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then((result) => {
            console.log('Success: ' + result);
            this.setState({
                recipe: result
            })
        }).catch((error) => {
            console.log('Error: ' + error);
        });
    }

    componentDidMount() {
        this.getRecipe();
    }

    render() {
        return (
            <div>
            <h1 className="recipeName">{this.state.recipe.name}</h1>
            <div className="notebookPage">
                <div className="popupRecipeFormContent">
                    <div className="popupRecipeTitleField">
                        <h1>{this.state.recipe.name}</h1>
                    </div>
                    <img src={this.state.recipe.imageURL} alt={this.state.recipe.name} width="500" height="500"/>
                    <div className="popupRecipeCookTimeField">
                        <p>{this.state.recipe.cookTime}</p>
                    </div>
                    <div className="popupRecipeDifficultyField">
                        <p>{this.state.recipe.difficulty}</p>
                    </div>
                    <div className="popupRecipeCuisineField">
                        <p>{this.state.recipe.cuisine}</p>
                    </div>
                    <div className="popupRecipeCategoryField">
                        <p>{this.state.recipe.category}</p>
                    </div>
                    <div className="popupRecipeVegetarianField">
                        <p>{this.state.recipe.vegetarian}</p>
                    </div>
                    <div className="popupRecipeVeganField">
                        <p>{this.state.recipe.vegan}</p>
                    </div>
                    <div className="popupRecipeGlutenFreeField">
                        <p>{this.state.recipe.glutenFree}</p>
                    </div>
                    <div className="popupRecipeInstructionsField">
                        <p>{this.state.recipe.instructions}</p>
                    </div>
                    <div className="popupRecipeIngredientsField">
                        <p>{this.state.recipe.ingredients}</p>
                    </div>
                </div>
            </div>
        </div>
        );
    }

}

export default RecipeItemPage;