import React, {
    Component
} from 'react';
import './RecipePopUpView.css';

class RecipePopUpView extends Component {
    constructor(props) {
        super(props)
        this.deleteRecipe = this.deleteRecipe.bind(this)
    }

    deleteRecipe(id) {
        this.props.onDelete(id);
    }

    render() {
        return (<div className="flowContainer">
                <div className="notebookPage">
                    <div className="popupRecipeFormContent">
                        <div className="popupRecipeTitleField">
                            <h1>{this.props.recipe.name}</h1>
                        </div>
                        <div className="popupRecipeCookTimeField">
                            <p>{this.props.recipe.cookTime}</p>
                        </div>
                        <div className="popupRecipeDifficultyField">
                            <p>{this.props.recipe.difficulty}</p>
                        </div>
                        <div className="popupRecipeCuisineField">
                            <p>{this.props.recipe.cuisine}</p>
                        </div>
                        <div className="popupRecipeCategoryField">
                            <p>{this.props.recipe.category}</p>
                        </div>
                        <div className="popupRecipeVegetarianField">
                            <p>{this.props.recipe.vegetarian}</p>
                        </div>
                        <div className="popupRecipeVeganField">
                            <p>{this.props.recipe.vegan}</p>
                        </div>
                        <div className="popupRecipeGlutenFreeField">
                            <p>{this.props.recipe.glutenFree}</p>
                        </div>
                        <div className="popupRecipeInstructionsField">
                            <p>{this.props.recipe.instructions}</p>
                        </div>
                        <div className="popupRecipeIngredientsField">
                            <p>{this.props.recipe.ingredients}</p>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

export default RecipePopUpView;