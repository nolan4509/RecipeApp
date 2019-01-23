/*
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
*/

import React, {
    Component
} from 'react';
// import AllRecipes from '../Components/AllRecipes/AllRecipes';
import Recipes from '../Components/Recipes/Recipes';

class AllRecipesPage extends Component {

    constructor(props) {
        super(props)
        this.handleViewRecipe = this.handleViewRecipe.bind(this);
        this.state = {
            recipesLoaded: 'False',
            recipes: [],
            currentRecipe: 'Test'
        }
    }

    getRecipes() {
        fetch(`/recipes`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then((result) => {
            console.log('Success: ' + result);
            this.setState({
                recipesLoaded: 'True',
                recipes: result
            })
        }).catch((error) => {
            console.log('In AllRecipes.js -- Error: ' + error);
        });
    }

    handleViewRecipe(id) {
        fetch(`/recipes/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then((result) => {
            console.log('Success: ' + result);
            // this.setState({
            //     currentRecipe: result
            // })
        }).catch((error) => {
            console.log('Error: ' + error);
        });
        // console.log(this);
        this.props.history.push('/recipes/view');
    }

    componentDidMount() {
        console.log('AllRecipesPage component mounted --');
        this.getRecipes();
    }

    render() {
        return (<div className = "bodyStyle">
            <br/>
            <Recipes recipes={this.state.recipes} onView={this.handleViewRecipe.bind(this.state.recipes.recipeID)}/>
        </div>);
    }
}

export default AllRecipesPage;