import React, {
    Component
} from 'react';
import Modal from 'react-awesome-modal';
import './RecipeItem.css';

// Modal is to display the popup when clicking on a recipe item tile

class RecipeItem extends Component {

    constructor(props) {
        super(props)
        this.handleCheckbox = this.handleCheckbox.bind(this);
        // STATE
        this.state = {
            isFavorite: false,
            visible: false,
            timeArray: this.getTimeArray()
        }
    }

    /*
     ** Calls GET '/users/favorites/check/:userID/:recipeID' and updates state.isFavorite to true if GET returned true
     */
    checkIfFavorite(recipeID) {
        fetch(`/users/favorites/check/${this.props.currentUserID}/${recipeID}`, {}).then(res => res.json()).then((result) => {
            if (result === true) {
                this.setState({
                    isFavorite: true
                });
            }
            return result;
        }).catch((error) => {
            console.log('In RecipeItem.js -- Error: ' + error);
            return false;
        });
    }

    /*
     ** Calls PUT '/users/favorites/:userID/:recipeID' and updates state.isFavorite to true
     */
    addFavorite() {
        fetch(`/users/favorites/${this.props.currentUserID}/${this.props.recipe.recipeID}`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            this.setState({
                isFavorite: true
            });
        }).catch((error) => {
            console.log('In RecipeItem.js -- Error: ' + error);
        });
    }

    /*
     ** Calls DELETE '/users/favorites/remove/:userID/:recipeID' and updates state.isFavorite to false
     */
    removeFavorite() {
        fetch(`/users/favorites/remove/${this.props.currentUserID}/${this.props.recipe.recipeID}`, {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            this.setState({
                isFavorite: false
            });
        }).catch((error) => {
            console.log('In RecipeItem.js -- Error: ' + error);
        });
    }

    // Call removeFavorite() or addFavorite() based off state.isFavorite
    handleCheckbox(e) {
        if (this.state.isFavorite) {
            this.removeFavorite();
        } else {
            this.addFavorite();
        }
    }

    // Update state.visible to true
    openModal() {
        this.setState({
            visible: true
        });
    }

    // Update state.visible to false
    closeModal() {
        this.setState({
            visible: false
        });
    }

    // Passes the ability to delete a recipe
    deleteRecipe(id) {
        this.props.onDelete(id);
    }

    // Passes the ability to view a recipe
    viewRecipe(id) {
        this.props.onView(id);
    }

    // Navigate to '/Recipe'
    viewFullRecipePage() {
        this.props.history.push('/Recipe');
    }

    /*
     ** Remove the ',' from props.recipe.cookTime and return it
     */
    getTimeArray() {
        let timeArray = this.props.recipe.cookTime.split(",");
        return timeArray;
    }

    /*
     ** Combine Prep & cook time and display it as a simple time value HH:MM
     */
    getShortHandTimeString() {
        let timeArray = this.state.timeArray;
        let carryover = 0;
        console.log(timeArray[0] + " | " + timeArray[1] + " | " + timeArray[2] + " | " + timeArray[3]);
        let totalMinutes = parseInt(timeArray[1]) + parseInt(timeArray[3]);
        if (totalMinutes > 59) {
            carryover = 1;
            totalMinutes = totalMinutes % 60;
        }
        let totalHours = parseInt(timeArray[0]) + parseInt(timeArray[2]) + carryover;
        if (totalHours == 0) {
            if (totalMinutes > 1) {
                return (String(totalMinutes) + " minutes");
            } else return (String(totalMinutes) + " minute");
        } else if (totalMinutes == 0) {
            if (totalHours > 1) {
                return (String(totalHours) + " hours");
            } else return (String(totalHours) + " hour");
        } else {
            if (totalHours > 1 && totalMinutes > 1) {
                return (String(totalHours) + " hrs & " + String(totalMinutes) + " mins");
            } else if (totalHours > 1) {
                return (String(totalHours) + " hrs & " + String(totalMinutes) + " min");
            } else if (totalMinutes > 1) {
                return (String(totalHours) + " hr & " + String(totalMinutes) + " mins");
            } else return (String(totalHours) + " hr & " + String(totalMinutes) + " min");
        }
    }

    /*
     ** Display Prep Time as a simple time value "Prep - HH:MM"
     */
    getPrepTimeString() {
        let timeArray = this.state.timeArray;
        let prepTimeString = "Prep - " + timeArray[0] + ":" + timeArray[1];
        return prepTimeString;
    }

    /*
     ** Display Cook Time as a simple time value "Cook - HH:MM"
     */
    getCookTimeString() {
        let timeArray = this.state.timeArray;
        let cookTimeString = "Cook - " + timeArray[2] + ":" + timeArray[3];
        return cookTimeString;
    }

    /*
     ** Update state.isFavorite by calling  function checkIfFavorite
     */
    componentWillMount() {
        this.setState({
            isFavorite: this.checkIfFavorite(this.props.recipe.recipeID)
        });

    }

    render() {
        let specialConditions = (this.props.recipe.glutenFree || this.props.recipe.vegetarian || this.props.recipe.vegan);
        return (<div className="recipeItemContainer">
            <div className="homepage-recipe-tile" onClick={() => this.openModal()}>
                <img src={ this.props.recipe.imageURL } alt="recipeImage" className="recipeImage"/>
                <h1 className="recipeName">{this.props.recipe.name}</h1>
                <h4 className="recipeCookTime">{this.getShortHandTimeString()}</h4>
                <h6 className="recipeDifficulty">{this.props.recipe.difficulty}</h6>
                {
                    specialConditions
                    ? (
                        <div className="specialChecks">
                            {
                                this.props.recipe.glutenFree
                                ? <h6 className="recipeGlutenFree">Gluten Free</h6>
                                : <br/>
                            }
                            {
                                this.props.recipe.vegan
                                ? <h6 className="recipeVegan">Vegan</h6>
                                : <br/>
                            }
                            {
                                this.props.recipe.vegetarian
                                ? <h6 className="recipeVegetarian">Vegetarian</h6>
                                : <br/>
                            }
                        </div>
                    )
                    : <br/>
            }
            </div>
            <div className="favoriteCheckboxContainer">
                <input type="checkbox" name="FavoriteButton" checked={!!this.state.isFavorite} onChange={this.handleCheckbox}/>
            </div>
            {/* Pop-Up Section */}
            <section>
                <Modal visible={this.state.visible} width='800' height='500' effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div className="recipePopupFormBackground">
                        <div className="recipePopupContainer">
                            <p className="recipePopupTitleField">{this.props.recipe.name}</p>
                            <img className="recipePopupImage"src={this.props.recipe.imageURL} alt={this.props.recipe.name} width='200' height='200' onClick={this.viewRecipe.bind(this,this.props.recipe.recipeID)}/>
                            <p className="recipePopupPrepTimeField">{this.getPrepTimeString()}</p>
                            <p className="recipePopupCookTimeField">{this.getCookTimeString()}</p>
                            <p className="recipePopupDifficultyField">{this.props.recipe.difficulty}</p>
                            <p className="recipePopupEthnicityField">{this.props.recipe.cuisine}</p>
                            <p className="recipePopupCategoryField">{this.props.recipe.category}</p>
                            <p className="recipePopupVegetarianField">{this.props.recipe.vegetarian}</p>
                            <p className="recipePopupVeganField">{this.props.recipe.vegan}</p>
                            <p className="recipePopupGlutenFreeField">{this.props.recipe.glutenFree}</p>
                            <p className="recipePopupIngredientsField">{this.props.recipe.ingredients}</p>
                            <p className="recipePopupInstructionsLabel">Instructions</p>
                            <p className="recipePopupInstructionsField">{this.props.recipe.instructions}</p>
                        </div>
                    </div>
                </Modal>
            </section>
        </div>);
    }
}

export default RecipeItem;