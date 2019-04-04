import React, {
    Component
} from 'react';
import './NewRecipe.css';
import {
    auth,
    storage
} from '../../firebase.js';
import FileUploader from 'react-firebase-file-uploader';
import history from '../../history';
let defaultImageURL = 'https://firebasestorage.googleapis.com/v0/b/recipe-app-4509.appspot.com/o/images%2FDefaultRecipeImage.png?alt=media&token=3d000675-8456-4939-a6d2-2f796d6bb328';

require('firebase/auth');

class NewRecipe extends Component {
    constructor(props) {
        super(props);
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangeCategory = this.handleChangeCategory.bind(this)
        this.handleChangeCuisine = this.handleChangeCuisine.bind(this)
        this.handleChangeDifficulty = this.handleChangeDifficulty.bind(this)
        this.handleChangeIngredients = this.handleChangeIngredients.bind(this)
        this.handleChangeInstructions = this.handleChangeInstructions.bind(this)
        this.handleChangePrepTimeHr = this.handleChangePrepTimeHr.bind(this)
        this.handleChangePrepTimeMin = this.handleChangePrepTimeMin.bind(this)
        this.handleChangeCookTimeHr = this.handleChangeCookTimeHr.bind(this)
        this.handleChangeCookTimeMin = this.handleChangeCookTimeMin.bind(this)
        this.handleChangeVegetarian = this.handleChangeVegetarian.bind(this)
        this.handleChangeVegan = this.handleChangeVegan.bind(this)
        this.handleChangeGlutenFree = this.handleChangeGlutenFree.bind(this)
        this.state = {
            newRecipe: {},
            name: '',
            authorID: '',
            category: 'Breakfast',
            cuisine: 'American',
            difficulty: 'Easy',
            ingredients: '',
            instructions: '',
            prepTimeHr: '',
            prepTimeMin: '',
            cookTimeHr: '',
            timeString: '',
            vegetarian: false,
            vegan: false,
            glutenFree: false,
            complete: false,
            submissionStatus: '',
            user: null,
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


    postRecipe = (e) => {
        e.preventDefault()
        //this.target.reset()
        this.setState({
            complete: false

        })
        let zipString = this.timeFormat();
        if (JSON.stringify(this.state.recipeImageURL).length === 2) {
            this.state.recipeImageURL = defaultImageURL
        }
        let reqBody = {
            name: this.state.name,
            authorID: auth.currentUser.uid,
            category: this.state.category,
            cuisine: this.state.cuisine,
            difficulty: this.state.difficulty,
            ingredients: this.state.ingredients,
            instructions: this.state.instructions,
            cookTime: zipString,
            vegetarian: this.state.vegetarian,
            vegan: this.state.vegan,
            glutenFree: this.state.glutenFree,
            imageURL: this.state.recipeImageURL
        }

        fetch('/newRecipe', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(reqBody)
        }).then((res) => {
            this.setState({
                submissionStatus: 'New Recipe Created!'
            })
            return res.json();
        }).then((json) => {
            console.log('Success: ' + json);
        }).catch((error) => {
            console.log('In NewRecipe.js -- Error: ' + error);
        });
        // e.preventDefault()
        history.push("/")

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

    handleChangePrepTimeHr(event) {
        this.setState({
            prepTimeHr: event.target.value
        })
    }

    handleChangePrepTimeMin(event) {
        this.setState({
            prepTimeMin: event.target.value
        })
    }

    handleChangeCookTimeHr(event) {
        this.setState({
            cookTimeHr: event.target.value
        })
    }

    handleChangeCookTimeMin(event) {
        this.setState({
            cookTimeMin: event.target.value
        })
    }

    // compresses all time values into a single string "prepHr,PrepMin,CookHr,CookMin"
    timeFormat() {
        let prepHr = this.state.prepTimeHr;
        let prepMin = this.state.prepTimeMin;
        let cookHr = this.state.cookTimeHr;
        let cookMin = this.state.cookTimeMin;
        if (prepHr > 59) {
            prepHr = 59;
        }
        if (prepHr < 0) {
            prepHr = 0;
        }
        if (prepMin > 59) {
            prepMin = 59;
        }
        if (prepMin < 0) {
            prepMin = 0;
        }
        if (cookHr > 59) {
            cookHr = 59;
        }
        if (cookHr < 0) {
            cookHr = 0;
        }
        if (cookMin > 59) {
            cookMin = 59;
        }
        if (cookMin < 0) {
            cookMin = 0;
        }

        this.setState({
            prepTimeHr: prepHr,
            prepTimeMin: prepMin,
            cookTimeHr: cookMin,
            cookTimeMin: cookMin
        });
        let zipString = String(prepHr) + "," + String(prepMin) + "," + String(cookHr) + "," + String(cookMin);
        return zipString;
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
    /*
        createTimeString() {
            let timeString = this.state.prepTime + "," +
        }
    */
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

        // const {
        //     complete
        // } = this.state

        return (<div className="backgroundStyle">
            <form id="newRecipeForm" onSubmit={this.postRecipe}>
                <div className="notebookPage">
                    {/* <Prompt when={!complete} message={location => (`Are you sure you want to go to ${location.pathname} before finishing your recipe post?`)}/> */}
                    <div className="newRecipeFormContent">
                        <div className="newRecipeTitleField">
                            <input type="text" id="newRecipeTitleField" name="newRecipeTitleField" placeholder="Recipe Title" value={this.state.name} onChange={this.handleChangeName}/>
                        </div>
                        <div className="newRecipeImageUpload">
                            {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
                            {this.state.recipeImageURL && <img id="uploadedImage" src={this.state.recipeImageURL} alt="Recipe"/>}
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
                        <div className="prepTimeLabel">
                            <h1>Prep Time:</h1>
                        </div>
                        <div className="cookTimeLabel">
                            <h1>Cook Time:</h1>
                        </div>
                        <div className="newRecipePrepTimeFieldHr">
                            <input type="number" ref="prepTimeHr" id="newRecipePrepTimeFieldHr" name="newRecipehourPrepTimeField" placeholder = "Hours" value={this.state.prepTimeHr} defaultValue="0" onChange={this.handleChangePrepTimeHr}/>
                        </div>
                        <div className="newRecipePrepTimeFieldMin">
                            <input type="number" ref="prepTimeMin" id="newRecipePrepTimeFieldMin" name="newRecipePrepTimeFieldMin" placeholder = "Min" value={this.state.prepTimeMin} defaultValue="0" onChange={this.handleChangePrepTimeMin}/>
                        </div>
                        <div className="newRecipeCookTimeFieldHr">
                            <input type="number" ref="cookTimeHr" id="newRecipeCookTimeFieldHr" name="newRecipeCookTimeFieldHr" placeholder = "Hours" value={this.state.cookTimeHr} defaultValue="0" onChange={this.handleChangeCookTimeHr}/>
                        </div>
                        <div className="newRecipeCookTimeFieldMin">
                            <input type="number" ref="cookTimeMin" id="newRecipeCookTimeFieldMin" name="newRecipeCookTimeFieldMin" placeholder = "Min" value={this.state.cookTimeMin} defaultValue="0" onChange={this.handleChangeCookTimeMin}/>
                        </div>
                        <div className="newRecipeDifficultyField">
                            <label htmlFor="newRecipeDifficultyField">Difficulty</label><br/>
                            <select ref="difficulty" id="newRecipeDifficultyField" name="newRecipeDifficultyField" value={this.state.difficulty} onChange={this.handleChangeDifficulty}>
                                {difficultyOptions}
                            </select>
                        </div>
                        <div className="newRecipeCategoryField">
                            <label htmlFor="newRecipeCategoryField">Category</label><br/>
                            <select ref="category" id="newRecipeCategoryField" name="newRecipeCategoryField" value={this.state.category} onChange={this.handleChangeCategory}>
                                {categoryOptions}
                            </select>
                        </div>
                        <div className="newRecipeCuisineField">
                            <label htmlFor="newRecipeCuisineField">Cuisine</label><br/>
                            <select ref="cuisine" id="newRecipeCuisineField" name="newRecipeCuisineField" value={this.state.cuisine} onChange={this.handleChangeCuisine}>
                                {cuisineOptions}
                            </select>
                        </div>
                        <div className="newRecipeIngredientsField">
                            <label htmlFor="newRecipeIngredientsField">Ingredients</label><br/>
                            <textarea ref="ingredientArray" id="newRecipeIngredientsField" name="newRecipeIngredientsField" rows="4" cols="30" value={this.state.ingredients} onChange={this.handleChangeIngredients}/>
                        </div>
                        <div className="newRecipeInstructionsField">
                            <label htmlFor="newRecipeInstructionsField">Instructions</label><br/>
                            <textarea ref="instructions" id="newRecipeInstructionsField" name="newRecipeInstructionsField" rows="4" cols="30" value={this.state.instructions} onChange={this.handleChangeInstructions}/>
                        </div>
                        <div className="newRecipeVegetarianField">
                            <label htmlFor="newRecipeVegetarianField">Vegetarian</label><br/>
                            <input type="checkbox" ref="vegetarian" id="newRecipeVegetarianField" name="newRecipeVegetarianField" value={this.state.vegetarian} onChange={this.handleChangeVegetarian}/>
                        </div>
                        <div className="newRecipeVeganField">
                            <label htmlFor="newRecipeVeganField">Vegan</label><br/>
                            <input type="checkbox" ref="vegan" id="newRecipeVeganField" name="newRecipeVeganField" value={this.state.vegan} onChange={this.handleChangeVegan}/>
                        </div>
                        <div className="newRecipeGlutenFreeField">
                            <label htmlFor="newRecipeGlutenFreeField">Gluten Free</label><br/>
                            <input type="checkbox" ref="glutenFree" id="newRecipeGlutenFreeField" name="newRecipeGlutenFreeField" value={this.state.glutenFree} onChange={this.handleChangeGlutenFree}/>
                        </div>
                        <br/>
                        <button id="newRecipeButton" className="newRecipeButton" form="newRecipeForm" type="submit">Submit</button>
                        <h3>{this.state.submissionStatus}</h3>
                    </div>
                </div>
            </form>
            </div>);
    }
}

export default NewRecipe;