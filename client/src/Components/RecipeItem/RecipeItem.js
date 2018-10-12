import React, {
    Component
} from 'react';
import './styles.css';

class RecipeItem extends Component {
    deleteRecipe(id) {
        this.props.onDelete(id);
    }

    render() {
        return (<div className="flowContainer">
            <div className="border border-warning rounded homepage-recipe-tile tileStyleB">
                <h1>{this.props.recipe.name}</h1>
                <img src="images/eeffreef.jpg" alt="HoneyPotGarlicImage" className="img-thumbnail mx-auto d-block" width="200" height="200"/>
                <h4>{this.props.recipe.cookTime}</h4>
                <h6>{this.props.recipe.difficulty}</h6>
                <button onClick={this.deleteRecipe.bind(this, this.props.recipe.recipeID)}>
                    <h3>Delete</h3>
                </button>
                <div className="coolCheckbox">
                    <input type="checkbox" name="Test"/>
                </div>
            </div>

        </div>);
    }
}

// RecipeItem.propTypes = {
//     recipe: React.PropTypes.object,
//     onDelete: React.PropTypes.func
// }

export default RecipeItem;