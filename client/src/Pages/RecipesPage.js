import React, {
    Component
} from 'react';
import Recipes from '../Components/Recipes/Recipes';

class RecipesPage extends Component {

    constructor(props) {
        super(props)
        this.handleViewRecipe = this.handleViewRecipe.bind(this);
        this.handleDeleteRecipe = this.handleDeleteRecipe.bind(this);
        this.state = {
            userID: '',
            recipes: [],
        }
    }

    getRecipes() {
        fetch(`/recipes/user/${this.props.currentUserID}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then((result) => {
            console.log('Success: ' + result);
            this.setState({
                recipes: result
            })
        }).catch((error) => {
            console.log('Error: ' + error);
        });
    }

    componentDidMount() {
        this.setState({
            userID: this.props.currentUserID
        })
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

    handleViewRecipe(id) {
        this.props.history.push(`/Recipe/${id}`);
    }

    render() {
        return (<div>
            <Recipes recipes={this.state.recipes} onDelete={this.handleDeleteRecipe.bind(this.state.recipes.recipeID)} onView={this.handleViewRecipe.bind(this.state.recipes.recipeID)} currentUserID={this.props.currentUserID}/>
        </div>);
    }
}

export default RecipesPage;