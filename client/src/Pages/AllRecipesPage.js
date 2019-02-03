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
            console.log('In AllRecipesPage.js -- Error: ' + error);
        });
    }

    handleViewRecipe(id) {
        this.props.history.replace(`/Recipe/${id}`);
    }

    componentDidMount() {
        this.getRecipes();
    }

    render() {
        return (<div className = "bodyStyle backgroundStyle">
            <br/>
            <Recipes recipes={this.state.recipes} onView={this.handleViewRecipe.bind(this.state.recipes.recipeID)}/>
        </div>);
    }
}

export default AllRecipesPage;