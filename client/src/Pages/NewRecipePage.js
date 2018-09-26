import React, {Component} from 'react';
import NewRecipe from '../Components/NewRecipe/NewRecipe';
import SafeNavBar from '../Components/NavBar/SafeNavBar';

class NewRecipePage extends Component {

    handleNewRecipe(recipe) {
        let recipes = this.state.recipes;
        recipes.push(recipe);
        this.setState({recipes: recipes});
    }

    render() {
        return (<div>
            <SafeNavBar/>
            <NewRecipe newRecipe={this.handleNewRecipe.bind(this)}/>
        </div>);
    }
}

export default NewRecipePage;
