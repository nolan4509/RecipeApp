import React, {
    Component
} from 'react';
import Recipes from '../Components/Recipes/Recipes';
import SafeNavBar from '../Components/NavBar/SafeNavBar';
// import uuid from 'uuid';

class RecipesPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userID: '4509',
            recipesLoaded: 'False',
            recipes: []
        }
    }

    getRecipes() {
        fetch(`/recipes/user/${this.state.userID}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
            .then((result) => {
                // console.log('Success: ' + result);
                this.setState({
                    recipesLoaded: 'True',
                    recipes: result
                })
            }).catch((error) => {
                console.log('Error: ' + error);
            });
    }

    componentDidMount() {
        this.getRecipes();
    }

    handleDeleteRecipe(id) {
        // id.preventDefault();
        console.log('trying to delete');
        fetch(`/recipes/remove/${id}`, {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            console.log(res);
            // Currently you must refresh the page after deleting something...
            // let recipes = this.state.recipes;
            // let index = recipes.findIndex(x => x.id === id);
            // recipes.splice(index, 1);
            // this.setState({
            //     recipes: recipes
            // })
        });
    }


    render() {
        return (<div className="bodyStyle">
            <SafeNavBar/>
            <h3>Latest Recipes for {this.state.userID}</h3>
            <h4>Loaded: {this.state.recipesLoaded}</h4>
            <Recipes recipes={this.state.recipes} onDelete={this.handleDeleteRecipe.bind(this.state.recipes.recipeID)}/>
        </div>);
    }
}

export default RecipesPage;