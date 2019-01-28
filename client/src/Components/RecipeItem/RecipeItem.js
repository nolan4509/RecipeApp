import React, {
    Component
} from 'react';
import Modal from 'react-awesome-modal';
import './RecipeItem.css';

class RecipeItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    openModal() {
        this.setState({
            visible: true
        });
    }

    closeModal() {
        this.setState({
            visible: false
        });
    }

    deleteRecipe(id) {
        this.props.onDelete(id);
    }

    viewRecipe(id) {
        this.props.onView(id);
    }

    viewFullRecipePage() {
        this.props.history.push('/Recipe');
    }

    render() {
        return (<div className="flowContainer">
            <div className="border border-warning rounded homepage-recipe-tile rainbowShadow" onClick={() => this.openModal()}>
                <h1 className="recipeName">{this.props.recipe.name}</h1>
                <img src={ this.props.recipe.imageURL } alt="recipeImage" className="img-thumbnail mx-auto d-block" width="200" height="200"/>
                <h4 className="recipeCookTime">{this.props.recipe.cookTime}</h4>
                <h6 className="recipeDifficulty">{this.props.recipe.difficulty}</h6>
                {/* <button className="recipeItemRemoveButton" onClick={this.deleteRecipe.bind(this, this.props.recipe.recipeID)}> */}
                {/* <button className="recipeItemRemoveButton" onClick=c}> */}
                    {/* <span className="forFlipButton front">Delete</span> */}
                    {/* <span className="forFlipButton center"></span> */}
                    {/* <span className="forFlipButton back">Recipe</span> */}
                {/* </button> */}
                <div className="coolCheckbox">
                    <input type="checkbox" name="Test"/>
                </div>
                <br/>
                <br/>
            </div>
            <section>
                <Modal visible={this.state.visible} width="800" height="600" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                        <div className="flowContainer">
                            <div className="notebookPage">
                                <div className="popupRecipeFormContent">
                                    <div className="popupRecipeTitleField">
                                        <h1>{this.props.recipe.name}</h1>
                                    </div>
                                    <img src={this.props.recipe.imageURL} alt={this.props.recipe.name} width='200' height='200'/>
                                    <div className="popupRecipeCookTimeField">
                                        <p>{this.props.recipe.cookTime}</p>
                                    </div>
                                    <div className="popupRecipeDifficultyField">
                                        <p>{this.props.recipe.difficulty}</p>
                                    </div>
                                    <div className="popupRecipeCuisineField">
                                        <p>{this.props.recipe.cuisine}</p>
                                    </div>
                                    <div className="popupRecipeCategoryField">
                                        <p>{this.props.recipe.category}</p>
                                    </div>
                                    <div className="popupRecipeVegetarianField">
                                        <p>{this.props.recipe.vegetarian}</p>
                                    </div>
                                    <div className="popupRecipeVeganField">
                                        <p>{this.props.recipe.vegan}</p>
                                    </div>
                                    <div className="popupRecipeGlutenFreeField">
                                        <p>{this.props.recipe.glutenFree}</p>
                                    </div>
                                    <div className="popupRecipeInstructionsField">
                                        <p>{this.props.recipe.instructions}</p>
                                    </div>
                                    <div className="popupRecipeIngredientsField">
                                        <p>{this.props.recipe.ingredients}</p>
                                    </div>
                                </div>
                                <button onClick={this.viewRecipe.bind(this,this.props.recipe.recipeID)}>
                                    Full View of Recipe
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </section>
        </div>);
    }
}

export default RecipeItem;