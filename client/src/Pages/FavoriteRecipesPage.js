import React, {
    Component
} from 'react';
import Recipes from '../Components/Recipes/Recipes';
import {
    auth
} from '../firebase.js';
import './login.css';

require('firebase/auth');

class FavoriteRecipesPage extends Component {

    constructor(props) {
        super(props)
        this.handleViewRecipe = this.handleViewRecipe.bind(this);
        this.state = {
            recipesLoaded: 'False',
            recipes: [],
            user: null,
            userID: ''
        }
    }

    getRecipes(id) {
        console.log("please");
        fetch(`/recipes/favorites/${id}`, {
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
            console.log('In FavoriteRecipesPage.js -- Error: ' + error);
        });
    }

    handleViewRecipe(id) {
        console.log(id);
        this.props.history.replace(`/Recipe/${id}`);
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                console.log('you are looking for this');
                this.setState({
                    user
                }); // When user signs in, checks the firebase database to see
                // if they were already previously authenticated, if so, restore
                this.setState({
                    userID: this.state.user.uid
                })
                this.getRecipes(this.state.userID);
                console.log('line 60' + this.state.userID);
            } else {
                console.log('bepped');
            }
        });
        // console.log('please');
        // this.getRecipes(this.state.userID);
        /*
        if (auth.currentUser) {
            this.setState({
                userID: auth.currentUser.uid
            })
            this.getRecipes(this.state.userID);
        } else if (this.state.userID) {
            this.setState({
                userID: this.state.user.uid
            })
            console.log('getting recipes');
            this.getRecipes(this.state.userID);
            console.log('line 76' + this.state.userID);
        } else {
            console.log('no user logged in.');
            console.log('line 79' + this.state.userID);
        }
        */
    }

    render() {
        return (<div className = "bodyStyle backgroundStyle">
            <br/>
            <Recipes recipes={this.state.recipes} onView={this.handleViewRecipe.bind(this.state.recipes.recipeID)}/>
        </div>);
    }
}

export default FavoriteRecipesPage;