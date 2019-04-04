import React, {
    Component
} from 'react';
import firebase from '../firebase.js';
import Modal from 'react-awesome-modal';
import './styles.css';

// importing firebase for image and recipe database access
// Modal is to display the recipe popup

class RecipeItemPage extends Component {
    constructor(props) {
        super(props);
        this.getRecipe = this.getRecipe.bind(this);
        this.deleteRecipe = this.deleteRecipe.bind(this);
        // STATE
        this.state = {
            recipe: [],
            timeArray: ""
        }
    }

    /*
     ** Calls GET '/recipes/:recipeID' and returns the recipe with the requested recipeID
     */
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
            this.getTimeArray(result);
            this.setState({
                recipe: result
            })
        }).catch((error) => {
            console.log('In RecipeItemPage.js -- Error: ' + error);
        });
    }

    /*
     ** Calls DELETE '/recipes/remove/:recipeID'
     */
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

    // Updates state.visible to true
    openModal() {
        this.setState({
            visible: true
        });
    }

    // Updates state.visible to false
    closeModal() {
        this.setState({
            visible: false
        });
    }

    getTimeArray(recipe) {
        let newArray = recipe.cookTime.split(",");
        this.setState({
            timeArray: newArray
        });
    }

    getTotalTimeString() {
        let timeArray = this.state.timeArray;
        let carryover = 0;
        console.log(timeArray[0] + " | " + timeArray[1] + " | " + timeArray[2] + " | " + timeArray[3]);
        let totalMinutes = parseInt(timeArray[1]) + parseInt(timeArray[3]);
        if (totalMinutes > 59) {
            carryover = 1;
            totalMinutes = totalMinutes % 60;
        }
        let totalHours = parseInt(timeArray[0]) + parseInt(timeArray[2]) + carryover;
        return (String(totalHours) + ":" + String(totalMinutes));
    }

    getPrepTimeString() {
        let timeArray = this.state.timeArray;
        let prepTimeString = "Prep - " + timeArray[0] + ":" + timeArray[1];
        return prepTimeString;
    }

    getCookTimeString() {
        let timeArray = this.state.timeArray;
        let cookTimeString = "Cook - " + timeArray[2] + ":" + timeArray[3];
        return cookTimeString;
    }

    // calls componentDidMount()
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
                    <p className="recipePopupPrepTimeField">{this.getPrepTimeString()}</p>
                    <p className="recipePopupCookTimeField">{this.getCookTimeString()}</p>
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