import React, {
    Component
} from 'react';
import './RecipeView.css';

class RecipeView extends Component {
    constructor(props) {
        super(props)
        this.deleteRecipe = this.deleteRecipe.bind(this)
    }

    deleteRecipe(id) {
        this.props.onDelete(id);
    }

    render() {
        return (<div className="flowContainer">
            <h1>Chicken Salad</h1>
            <p>Author: John Doe</p>
            <img src="images/chickun.jpg" alt="ChickenSaladImage" width="500" height="500"/>
            <p>serves: 4 | cook time: 20 minutes</p>
            <h2>Ingredients</h2>
            <ul>
                <li>4 chicken breasts</li>
                <li>2 Granny Smith Apples</li>
                <li>1 cup seedless grapes</li>
                <li>¼ cup Craisins or raisins (optional)</li>
                <li>2 – 3 Green Onions (optional)</li>
                <li>1 tsp Lemon Pepper (optional, to taste)</li>
                <li>½ - 2/3 cup mayonnaise </li>
                <li>1 Melon (Honeydew, Cantelope, etc.)</li>
            </ul>
            <h2>Instructions</h2>
            <p>Boil chicken breasts until done. Cool in refrigerator until well chilled.</p>
            <p>Cut chicken into bite size pieces. Core apples and cut into bite size pieces.
                Cut grapes in half. Mix chicken, apples, grapes, Craisins, onion and lemon
                pepper with mayonnaise. Adjust mayonnaise depending on desired consistency/taste.
                Chill.</p>
            <p>Serve chicken salad over slices of seeded melon.</p>
            <button className="recipeItemRemoveButton" onClick={this.viewRecipe.bind(this,this.props.recipe.recipeID)}>
                <span className="forFlipButton front">Click</span>
                <span className="forFlipButton center"></span>
                <span className="forFlipButton back">Here</span>
            </button>
        </div>);
    }
}

export default RecipeView;