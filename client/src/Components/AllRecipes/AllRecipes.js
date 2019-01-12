import React, {
    Component
} from 'react';
import Recipes from '../Recipes/Recipes';
import './AllRecipes.css';
// import uuid from 'uuid';

class AllRecipes extends Component {

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

    componentDidMount() {
        console.log('AllRecipes.js mounted-- pre getRecipes call --');
        this.getRecipes();
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

    render() {
        return (<div className = "bodyStyle">
            <br/>
            <Recipes recipes={this.state.recipes} onView={this.handleViewRecipe.bind(this.state.recipes.recipeID)}/>
        </div>);
    }
}

export default AllRecipes;