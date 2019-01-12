import React, {
    Component
} from 'react';
import AllRecipes from '../Components/AllRecipes/AllRecipes';

class AllRecipesPage extends Component {
    viewRecipe(id) {
        this.props.onView(id);
    }

    componentDidMount() {
        console.log('AllRecipesPage component mounted --');
    }

    render() {
        return (<div className = "bodyStyle">
            <br/>
            <AllRecipes recipes={this.state.recipes} onView={this.handleViewRecipe.bind(this.state.recipes.recipeID)}/>
        </div>);
    }
}

export default AllRecipesPage;