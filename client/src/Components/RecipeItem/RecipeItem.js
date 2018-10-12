import React, {
    Component
} from 'react';
import './RecipeItem.css';

class RecipeItem extends Component {
    deleteRecipe(id) {
        this.props.onDelete(id);
    }

    render() {
        return (<div className="flowContainer">
            <div className="border border-warning rounded homepage-recipe-tile">
                <h1 className="recipeName">{this.props.recipe.name}</h1>
                <img src="images/eeffreef.jpg" alt="HoneyPotGarlicImage" className="img-thumbnail mx-auto d-block" width="200" height="200"/>
                <h4 className="recipeCookTime">{this.props.recipe.cookTime}</h4>
                <h6 className="recipeDifficulty">{this.props.recipe.difficulty}</h6>
                <button className="recipeItemRemoveButton" onClick={this.deleteRecipe.bind(this, this.props.recipe.recipeID)}>
                    <span className="forFlipButton front">Click</span>
                    <span className="forFlipButton center"></span>
                    <span className="forFlipButton back">Here</span>
                </button>
                <div className="coolCheckbox">
                    <input type="checkbox" name="Test"/>
                </div>
                <br/>
                <br/>
            </div>

        </div>);
    }
}

// RecipeItem.propTypes = {
//     recipe: React.PropTypes.object,
//     onDelete: React.PropTypes.func
// }

export default RecipeItem;