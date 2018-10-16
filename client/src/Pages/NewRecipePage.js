import React, {
    Component
} from 'react';
import NewRecipe from '../Components/NewRecipe/NewRecipe';
import NavBar from '../Components/NavBar/NavBar';

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
            <NavBar/>
            <NewRecipe newRecipe={this.handleNewRecipe.bind(this)}/>
        </div>);
    }
}

export default NewRecipePage;