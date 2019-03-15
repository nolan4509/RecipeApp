import React, {
    Component
} from 'react';
import Modal from 'react-awesome-modal';
import './RecipeItem.css';

class RecipeItem extends Component {

    constructor(props) {
        super(props)
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.state = {
            isFavorite: false,
            visible: false
        }
    }

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

    handleCheckbox(e) {
        if (this.state.isFavorite) {
            this.removeFavorite();
        } else {
            this.addFavorite();
        }
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
                <h4 className="recipeCookTime">{this.props.recipe.cookTime}</h4>
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
                            <img className="recipePopupImage"src={this.props.recipe.imageURL} alt={this.props.recipe.name} width='200' height='200'/>
                            <p className="recipePopupCookTimeField">{this.props.recipe.cookTime}</p>
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
                    <button onClick={this.viewRecipe.bind(this,this.props.recipe.recipeID)}>
                        Full View of Recipe
                    </button>
                </Modal>
            </section>
        </div>);
    }
}

export default RecipeItem;