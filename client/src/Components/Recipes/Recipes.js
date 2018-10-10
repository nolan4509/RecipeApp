import React, {Component} from 'react';
import './styles.css';
import RecipeItem from '../RecipeItem/RecipeItem';

class Recipes extends Component {
    deleteRecipe(id) {
        this.props.onDelete(id);
    }

    render() {
        let recipeItems;
        if (this.props.recipes) {
            recipeItems = this.props.recipes.map(recipe => {
                // console.log(recipe);
                return (<RecipeItem onDelete={this.deleteRecipe.bind(this)} key={recipe.title} recipe={recipe}/>);
            });
        }
        return (<div className="container">
            <h3>Latest Recipes</h3>
            <div className="row rowSpacing">
                {recipeItems}
            </div>
        </div>);
    }
}

// Recipes.propTypes = {
//     recipes: React.PropTypes.array,
//     onDelete: React.PropTypes.func
// }

export default Recipes;
