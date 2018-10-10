import React, {
    Component
} from 'react';
import Recipes from '../Components/Recipes/Recipes';
import SafeNavBar from '../Components/NavBar/SafeNavBar';
import uuid from 'uuid';

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
        }).then((res) => {
            const recipes = res.data.children.map(obj => obj.data);
            this.setState({
                recipesLoaded: 'True',
                recipes
            })
        }).then((json) => {
            console.log('Success: ' + json);
        }).catch((error) => {
            console.log('Error: ' + error);
        });
        // this.setState({
        //     recipes: [{
        //         id: uuid.v4(),
        //         name: 'Honey Pot Chicken',
        //         recipeID: '123',
        //         authorID: '321',
        //         category: 'Dinner',
        //         cuisine: 'American',
        //         difficulty: 'Medium',
        //         ingredients: 'Chicken, Onions, SAUCE',
        //         instructions: 'COOK THE CHICKEN ',
        //         cookTime: 'Three Days',
        //         vegetarian: 'No',
        //         vegan: 'No',
        //         glutenFree: 'No'
        //     }, {
        //         id: uuid.v4(),
        //         name: 'Chicken Salad',
        //         recipeID: '123',
        //         authorID: '321',
        //         category: 'Dinner',
        //         cuisine: 'American',
        //         difficulty: 'Medium',
        //         ingredients: 'Chicken, Onions, SAUCEY SAUCE',
        //         instructions: 'MAKE THE SALAD',
        //         cookTime: 'TWO Days',
        //         vegetarian: 'No',
        //         vegan: 'No',
        //         glutenFree: 'No'
        //     }, {
        //         id: uuid.v4(),
        //         name: 'Ramen',
        //         recipeID: '123',
        //         authorID: '321',
        //         category: 'Lunch',
        //         cuisine: 'American',
        //         difficulty: 'Medium',
        //         ingredients: 'Noodles, Spicey Goodness',
        //         instructions: 'Boil Water and then Shove Noodles in it.',
        //         cookTime: 'Three Minutes',
        //         vegetarian: 'No',
        //         vegan: 'No',
        //         glutenFree: 'No'
        //     }, {
        //         id: uuid.v4(),
        //         name: 'Ramen',
        //         recipeID: '123',
        //         authorID: '321',
        //         category: 'Lunch',
        //         cuisine: 'American',
        //         difficulty: 'Medium',
        //         ingredients: 'Noodles, Spicey Goodness',
        //         instructions: 'Boil Water and then Shove Noodles in it.',
        //         cookTime: 'Three Minutes',
        //         vegetarian: 'No',
        //         vegan: 'No',
        //         glutenFree: 'No'
        //     }, {
        //         id: uuid.v4(),
        //         name: 'Ramen',
        //         recipeID: '123',
        //         authorID: '321',
        //         category: 'Lunch',
        //         cuisine: 'American',
        //         difficulty: 'Medium',
        //         ingredients: 'Noodles, Spicey Goodness',
        //         instructions: 'Boil Water and then Shove Noodles in it.',
        //         cookTime: 'Three Minutes',
        //         vegetarian: 'No',
        //         vegan: 'No',
        //         glutenFree: 'No'
        //     }, {
        //         id: uuid.v4(),
        //         name: 'Ramen',
        //         recipeID: '123',
        //         authorID: '321',
        //         category: 'Lunch',
        //         cuisine: 'American',
        //         difficulty: 'Medium',
        //         ingredients: 'Noodles, Spicey Goodness',
        //         instructions: 'Boil Water and then Shove Noodles in it.',
        //         cookTime: 'Three Minutes',
        //         vegetarian: 'No',
        //         vegan: 'No',
        //         glutenFree: 'No'
        //     }, {
        //         id: uuid.v4(),
        //         name: 'Ramen',
        //         recipeID: '123',
        //         authorID: '321',
        //         category: 'Lunch',
        //         cuisine: 'American',
        //         difficulty: 'Medium',
        //         ingredients: 'Noodles, Spicey Goodness',
        //         instructions: 'Boil Water and then Shove Noodles in it.',
        //         cookTime: 'Three Minutes',
        //         vegetarian: 'No',
        //         vegan: 'No',
        //         glutenFree: 'No'
        //     }]
        // });
    }

    componentWillMount() {
        this.getRecipes();
    }

    handleDeleteRecipe(id) {
        let recipes = this.state.recipes;
        let index = recipes.findIndex(x => x.id === id);
        recipes.splice(index, 1);
        this.setState({
            recipes: recipes
        });
    }

    render() {
        return (<div className="bodyStyle">
            <SafeNavBar/>
            <h3>Latest Recipes for {this.state.userID}</h3>
            <h4>Loaded: {this.state.recipesLoaded}</h4>
            <Recipes recipes={this.state.recipes} onDelete={this.handleDeleteRecipe.bind(this)}/>
        </div>);
    }
}

export default RecipesPage;