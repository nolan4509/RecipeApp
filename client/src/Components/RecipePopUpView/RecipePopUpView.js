import React, {
    Component
} from 'react';
import Modal from 'react-awesome-modal';
import './RecipePopUpView.css';

class RecipePopUpView extends Component {
    constructor(props) {
        super(props)
        this.deleteRecipe = this.deleteRecipe.bind(this)
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

    render() {
        return (<section><input type="button" value="Open" onClick={() => this.openModal()} />
        <Modal visible={this.state.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                        <div className="flowContainer">
                            <div className="notebookPage">
                                <div className="popupRecipeFormContent">
                                    <div className="popupRecipeTitleField">
                                        <h1>{this.props.recipe.name}</h1>
                                    </div>
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
                            </div>
                        </div>
                        <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
                    </div>
                </Modal>

        </section>);
    }
}

export default RecipePopUpView;