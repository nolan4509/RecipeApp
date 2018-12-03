import React, {
    Component
} from 'react';
import './Recipes.css';
import RecipeItem from '../RecipeItem/RecipeItem';

class Recipes extends Component {
    deleteRecipe(id) {
        this.props.onDelete(id);
    }

    render() {
        let recipeItems;
        console.log('Inside Recipes.js: ');
        console.log(this.props);
        if (this.props.recipes) {
            recipeItems = this.props.recipes.map(recipe => {
                return (<RecipeItem onDelete={this.deleteRecipe.bind(this)} key={recipe.name} recipe={recipe}/>);
            });
        }
        return (<div className="container">
            <div className="row rowSpacing">
                {recipeItems}
            </div>
        </div>);
    }
}

export default Recipes;