import React, {
    Component
} from 'react';
import {
    auth,
    storage,
    child,
    provider
} from '../../firebase.js';
import './RecipeItem.css';

class RecipeItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            image: ''
        }
        this.getImage('image');
    }


    getImage(image) {
        let {
            state
        } = this;
        this.state[image] = this.props.recipe.imageURL;
        this.setState(state);
    }

    deleteRecipe(id) {
        this.props.onDelete(id);
    }

    viewRecipe(id) {
        this.props.onView(id);
    }

    render() {
        return (<div className="flowContainer">
            <div className="border border-warning rounded homepage-recipe-tile rainbowShadow" onClick={this.viewRecipe.bind(this, this.props.recipe.recipeID)}>
                <h1 className="recipeName">{this.props.recipe.name}</h1>
                <img src={ this.state.image } alt="recipeImage" className="img-thumbnail mx-auto d-block" width="200" height="200"/>
                <h4 className="recipeCookTime">{this.props.recipe.cookTime}</h4>
                <h6 className="recipeDifficulty">{this.props.recipe.difficulty}</h6>
                <button className="recipeItemRemoveButton" onClick={this.deleteRecipe.bind(this, this.props.recipe.recipeID)}>
                {/* <button className="recipeItemRemoveButton" onClick={this.viewRecipe.bind(this,this.props.recipe.recipeID)}> */}
                    <span className="forFlipButton front">Delete</span>
                    <span className="forFlipButton center"></span>
                    <span className="forFlipButton back">Recipe</span>
                </button>
                <div className="coolCheckbox">
                    <input type="checkbox" name="Test"/>
                </div>
                <br/>
                <br/>
            </div>
        </div>);
    }
}

export default RecipeItem;