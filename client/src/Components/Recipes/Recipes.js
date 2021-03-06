import React, {
    Component
} from 'react';
import './Recipes.css';
import RecipeItem from '../RecipeItem/RecipeItem';

class Recipes extends Component {

    // Passes the ability to delete a recipe
    deleteRecipe(id) {
        this.props.onDelete(id);
    }

    // Passes the ability to view a recipe
    viewRecipe(id) {
        this.props.onView(id);
    }

    render() {
        let recipeItems;
        if (this.props.recipes) {
            recipeItems = this.props.recipes.map(recipe => {
                return (<RecipeItem onDelete={this.deleteRecipe.bind(this)} onView={this.viewRecipe.bind(this)} key={recipe.name} recipe={recipe} currentUserID={this.props.currentUserID}/>);
            });
        }
        return (<div className="recipesContainer">
                {recipeItems}
            </div>);
    }
}

export default Recipes;