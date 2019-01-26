import React, {
    Component
} from 'react';
import Recipes from '../Components/Recipes/Recipes';
import './login.css';

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
        console.log("please");
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
    }

    componentDidMount() {
        this.getRecipes();
    }

    render() {
        return (<div className = "bodyStyle backgroundStyle">
            <br/>
            <Recipes recipes={this.state.recipes} onView={this.handleViewRecipe.bind(this.state.recipes.recipeID)}/>
            {/* <Recipes recipes={this.state.recipes} /> */}
        </div>);
    }
}

export default AllRecipesPage;