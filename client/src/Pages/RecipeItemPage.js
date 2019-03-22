import React, {
    Component
} from 'react';
import firebase from '../firebase.js';
import Modal from 'react-awesome-modal';
import './styles.css';

class RecipeItemPage extends Component {
    constructor(props) {
        super(props);
        this.getRecipe = this.getRecipe.bind(this);
        this.deleteRecipe = this.deleteRecipe.bind(this);
        this.state = {
            recipe: []
        }
    }

    getRecipe() {
        const {
            recipeID
        } = this.props.match.params
        fetch(`/recipes/${recipeID}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then((result) => {
            console.log('Success: ' + result);
            this.setState({
                recipe: result
            })
        }).catch((error) => {
            console.log('In RecipeItemPage.js -- Error: ' + error);
        });
    }

    deleteRecipe() {
        const recipeID = this.state.recipe.recipeID;
        if (this.state.recipe.authorID === firebase.auth().currentUser.uid) {
            fetch(`/recipes/remove/${recipeID}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((result) => {
                this.props.history.push('/');
            }).catch((error) => {
                console.log('In RecipeItemPage.js -- Error: ' + error);
            });
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

    componentDidMount() {
        this.getRecipe();
    }

    render() {
        return (
            <div className="backgroundStyle">
            <div className="recipeItemPageBackground">
                <div className="recipeItemPageContainer">
                    <p className="recipePopupTitleField">{this.state.recipe.name}</p>
                    <img className="recipePopupImage"src={this.state.recipe.imageURL} alt={this.state.recipe.name} width='200' height='200'/>
                    <p className="recipePopupCookTimeField">{this.state.recipe.cookTime}</p>
                    <p className="recipePopupDifficultyField">{this.state.recipe.difficulty}</p>
                    <p className="recipePopupEthnicityField">{this.state.recipe.cuisine}</p>
                    <p className="recipePopupCategoryField">{this.state.recipe.category}</p>
                    <p className="recipePopupVegetarianField">{this.state.recipe.vegetarian}</p>
                    <p className="recipePopupVeganField">{this.state.recipe.vegan}</p>
                    <p className="recipePopupGlutenFreeField">{this.state.recipe.glutenFree}</p>
                    <p className="recipePopupIngredientsField">{this.state.recipe.ingredients}</p>
                    <p className="recipePopupInstructionsLabel">Instructions</p>
                    <p className="recipePopupInstructionsField">{this.state.recipe.instructions}</p>
                </div>
            </div>
            <button className="recipeItemRemoveButton" onClick={() => this.openModal()}>
                <span className="forFlipButton front">Delete</span>
                <span className="forFlipButton center"></span>
                <span className="forFlipButton back">Recipe</span>
            </button>
            <section>
                <Modal visible={this.state.visible} width='800' height='500' effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <h2>Are you sure you want to delete this Recipe?</h2>
                    <button className="recipeItemConfirmRemoveButton" onClick={this.deleteRecipe}>Yes</button>
                    <button className="recipeItemCancelButton" onClick={() => this.closeModal()}>No</button>
                </Modal>
            </section>
        </div>
        );
    }

}

export default RecipeItemPage;