import React, {
    Component
} from 'react';
import './RecipeView.css';

class RecipeView extends Component {
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
                    <div className="newRecipeFormContent">
                        <div className="newRecipeTitleField">
                            <h1>{this.props.recipe.name}</h1>
                        </div>
                        <p>{this.props.recipe.cookTime}</p>
                        <p>{this.props.recipe.difficulty}</p>
                        <p>{this.props.recipe.cuisine}</p>
                        <p>{this.props.recipe.category}</p>
                        <p>{this.props.recipe.vegetarian}</p>
                        <p>{this.props.recipe.vegan}</p>
                        <p>{this.props.recipe.glutenFree}</p>
                        <p>{this.props.recipe.instructions}</p>
                        <p>{this.props.recipe.ingredients}</p>
                    </div>
                </div>
            </div>);
    }
}

export default RecipeView;