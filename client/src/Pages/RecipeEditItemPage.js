import React, {
    Component
} from 'react';
import './styles.css';
import {
    auth,
    storage
} from '../firebase.js';
import FileUploader from 'react-firebase-file-uploader';
import history from '../history';
let defaultImageURL = 'https://firebasestorage.googleapis.com/v0/b/recipe-app-4509.appspot.com/o/images%2FDefaultRecipeImage.png?alt=media&token=3d000675-8456-4939-a6d2-2f796d6bb328';

require('firebase/auth');

class RecipeEditItemPage extends Component {
    constructor(props) {
        super(props);
        this.getRecipe = this.getRecipe.bind(this)
        this.updateRecipe = this.updateRecipe.bind(this)
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangeCategory = this.handleChangeCategory.bind(this)
        this.handleChangeCuisine = this.handleChangeCuisine.bind(this)
        this.handleChangeDifficulty = this.handleChangeDifficulty.bind(this)
        this.handleChangeIngredients = this.handleChangeIngredients.bind(this)
        this.handleChangeInstructions = this.handleChangeInstructions.bind(this)
        this.handleChangeCookTime = this.handleChangeCookTime.bind(this)
        this.handleChangeVegetarian = this.handleChangeVegetarian.bind(this)
        this.handleChangeVegan = this.handleChangeVegan.bind(this)
        this.handleChangeGlutenFree = this.handleChangeGlutenFree.bind(this)
        this.state = {
            recipe: [],
            name: '',
            authorID: '',
            category: 'Breakfast',
            cuisine: 'American',
            difficulty: 'Easy',
            ingredients: '',
            instructions: '',
            cookTime: '',
            vegetarian: false,
            vegan: false,
            glutenFree: false,
            submissionStatus: '',
            isUploading: false,
            progress: 0,
            recipeImage: '',
            recipeImageURL: ''
        }
    }

    static defaultProps = {
        categories: [
            'Breakfast', 'Lunch', 'Dinner', 'Snack'
        ],
        cuisines: [
            'American', 'Asian', 'Mexican', 'Other'
        ],
        difficulties: ['Easy', 'Medium', 'Difficult']
    }

    getRecipe() {
        console.log('LMAO');
        fetch(`/recipes/${this.props.recipe.recipeID}`, {
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
            console.log('In RecipeEditItemPage.js -- Error: ' + error);
        });
    }

    updateRecipe = (e) => {
        console.log('LMAO');
        e.preventDefault()
        if (JSON.stringify(this.state.recipeImageURL).length === 2) {
            this.state.recipeImageURL = defaultImageURL
        }
        let reqBody = {
            name: this.props.recipe.name,
            authorID: auth.currentUser.uid,
            category: this.props.recipe.category,
            cuisine: this.props.recipe.cuisine,
            difficulty: this.props.recipe.difficulty,
            ingredients: this.props.recipe.ingredients,
            instructions: this.props.recipe.instructions,
            cookTime: this.props.recipe.cookTime,
            vegetarian: this.props.recipe.vegetarian,
            vegan: this.props.recipe.vegan,
            glutenFree: this.props.recipe.glutenFree,
            imageURL: this.props.recipeImageURL
        }

        if (this.props.recipe.authorID === auth().currentUser.uid) {
            fetch(`/recipes/update/${this.props.recipe.recipeID}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify(reqBody)
            }).then((result) => {
                history.push('/');

            }).catch((error) => {
                console.log('In RecipeEditItemPage.js -- Error: ' + error);
            });
        }
    }

    handleChangeName(event) {
        this.setState({
            name: event.target.value
        })
    }

    handleChangeCategory(event) {
        this.setState({
            category: event.target.value
        })
    }

    handleChangeCuisine(event) {
        this.setState({
            cuisine: event.target.value
        })
    }

    handleChangeDifficulty(event) {
        this.setState({
            difficulty: event.target.value
        })
    }

    handleChangeIngredients(event) {
        this.setState({
            ingredients: event.target.value
        })
    }

    handleChangeInstructions(event) {
        this.setState({
            instructions: event.target.value
        })
    }

    handleChangeCookTime(event) {
        this.setState({
            cookTime: event.target.value
        })
    }

    handleChangeVegetarian(event) {
        this.setState({
            vegetarian: !this.state.vegetarian
        })
    }

    handleChangeVegan(event) {
        this.setState({
            vegan: !this.state.vegan
        })
    }

    handleChangeGlutenFree(event) {
        this.setState({
            glutenFree: !this.state.glutenFree
        })
    }

    handleUploadStart = () => this.setState({
        isUploading: true,
        progress: 0
    });

    handleProgress = (progress) => this.setState({
        progress
    });

    handleUploadError = (error) => {
        this.setState({
            isUploading: false
        })
        console.error(error);
    }

    handleUploadSuccess = (filename) => {
        this.setState({
            recipeImage: filename,
            progress: 100,
            isUploading: false
        });
        storage.ref("images").child(filename).getDownloadURL()
            .then(url => this.setState({
                recipeImageURL: url
            }));
    };

    componentDidMount() {
        console.log('lmao');
        this.getRecipe();
    }


    render() {
        let categoryOptions = this.props.categories.map(category => {
            return <option key={category} value={category}>{category}</option>
        });
        let cuisineOptions = this.props.cuisines.map(cuisine => {
            return <option key={cuisine} value={cuisine}>{cuisine}</option>
        });
        let difficultyOptions = this.props.difficulties.map(difficulty => {
            return <option key={difficulty} value={difficulty}>{difficulty}</option>
        });

        return (<div>
            <form id="editRecipeForm" onSubmit={this.updateRecipe}>
                <div className="notebookPage">
                    <div className="editRecipeFormContent">
                        <div className="editRecipeTitleField">
                            <input type="text" id="editRecipeTitleField" name="editRecipeTitleField" value={this.props.recipe.name} onChange={this.handleChangeName}/>
                        </div>
                        <div className="editRecipeImageUpload">
                            {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
                            {this.state.recipeImageURL && <img id="editRecipeUploadedImage" src={this.state.recipeImageURL} alt="Recipe"/>}
                            <label style={{backgroundColor: 'steelblue', color: 'white', padding: 5, borderRadius: 4, pointer: 'cursor',}}>
                                Select Image
                                <FileUploader
                                    hidden
                                    accept="image/*"
                                    name="recipeImage"
                                    randomizeFilename
                                    storageRef={storage.ref("images")}
                                    onUploadStart={this.handleUploadStart}
                                    onUploadError={this.handleUploadError}
                                    onUploadSuccess={this.handleUploadSuccess}
                                    onProgress={this.handleProgress}
                                    maxHeight="300"
                                    maxWidth="400"
                                />
                            </label>
                        </div>
                        <div className="editRecipecookTimeLabel">
                            <h1>Cook Time:</h1>
                        </div>
                        <div className="editRecipeCookTimeField">
                            <input type="text" ref="cookTime" id="newRecipeCookTimeField" name="editRecipeCookTimeField" value={this.props.cookTime} onChange={this.handleChangeCookTime}/>
                        </div>
                        <div className="editRecipeDifficultyField">
                            <label htmlFor="editRecipeDifficultyField">Difficulty</label><br/>
                            <select ref="difficulty" id="editRecipeDifficultyField" name="editRecipeDifficultyField" value={this.state.difficulty} onChange={this.handleChangeDifficulty}>
                                {difficultyOptions}
                            </select>
                        </div>
                        <div className="editRecipeCategoryField">
                            <label htmlFor="editRecipeCategoryField">Category</label><br/>
                            <select ref="category" id="editRecipeCategoryField" name="editRecipeCategoryField" value={this.state.category} onChange={this.handleChangeCategory}>
                                {categoryOptions}
                            </select>
                        </div>
                        <div className="editRecipeCuisineField">
                            <label htmlFor="editRecipeCuisineField">Cuisine</label><br/>
                            <select ref="cuisine" id="editRecipeCuisineField" name="editRecipeCuisineField" value={this.state.cuisine} onChange={this.handleChangeCuisine}>
                                {cuisineOptions}
                            </select>
                        </div>
                        <div className="editRecipeIngredientsField">
                            <label htmlFor="editRecipeIngredientsField">Ingredients</label><br/>
                            <textarea ref="ingredientArray" id="editRecipeIngredientsField" name="editRecipeIngredientsField" rows="4" cols="30" value={this.state.ingredients} onChange={this.handleChangeIngredients}/>
                        </div>
                        <div className="editRecipeInstructionsField">
                            <label htmlFor="editRecipeInstructionsField">Instructions</label><br/>
                            <textarea ref="instructions" id="editRecipeInstructionsField" name="editRecipeInstructionsField" rows="4" cols="30" value={this.state.instructions} onChange={this.handleChangeInstructions}/>
                        </div>
                        <div className="editRecipeVegetarianField">
                            <label htmlFor="editRecipeVegetarianField">Vegetarian</label><br/>
                            <input type="checkbox" ref="vegetarian" id="editRecipeVegetarianField" name="editRecipeVegetarianField" value={this.state.vegetarian} onChange={this.handleChangeVegetarian}/>
                        </div>
                        <div className="newRecipeVeganField">
                            <label htmlFor="newRecipeVeganField">Vegan</label><br/>
                            <input type="checkbox" ref="vegan" id="editRecipeVeganField" name="editRecipeVeganField" value={this.state.vegan} onChange={this.handleChangeVegan}/>
                        </div>
                        <div className="editRecipeGlutenFreeField">
                            <label htmlFor="editRecipeGlutenFreeField">Gluten Free</label><br/>
                            <input type="checkbox" ref="glutenFree" id="editRecipeGlutenFreeField" name="editRecipeGlutenFreeField" value={this.state.glutenFree} onChange={this.handleChangeGlutenFree}/>
                        </div>
                        <br/>
                        <button id="editRecipeButton" className="editRecipeButton" form="editRecipeForm" type="submit">Submit</button>
                        <h3>{this.state.submissionStatus}</h3>
                    </div>
                </div>
            </form>
            </div>);
    }
}

export default RecipeEditItemPage;