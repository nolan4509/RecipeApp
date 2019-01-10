import React, {
    Component
} from 'react';
import NewRecipe from '../Components/NewRecipe/NewRecipe';

class NewRecipePage extends Component {
    handleNewRecipe(recipe) {
        let recipes = this.state.recipes;
        recipes.push(recipe);
        this.setState({
            recipes: recipes
        });
    }

    render() {
        return (<div>
            <NewRecipe newRecipe={this.handleNewRecipe.bind(this)}/>
        </div>);
    }
}

export default NewRecipePage;