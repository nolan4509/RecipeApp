import React, {
    Component
} from 'react';
import {
    Prompt
} from 'react-router-dom';
import './styles.css';
import uuid from 'uuid';

class NewRecipe extends Component {
    constructor(props) {
        super(props);
        this.handleChangeName = this.handleChangeName.bind(this)
        this.handleChangeRecipeID = this.handleChangeRecipeID.bind(this)
        this.handleChangeAuthorID = this.handleChangeAuthorID.bind(this)
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
            newRecipe: {},
            name: 'Please',
            recipeID: '777',
            category: '',
            cuisine: '',
            difficulty: '',
            ingredients: 'FOR',
            instructions: 'FUCK',
            cookTime: '30',
            vegetarian: false,
            vegan: false,
            glutenFree: false,
            userID: '4509',
            authorID: '4509',
            complete: false,
            submissionStatus: ''
        }
    }

    static defaultProps = {
        categories: [
            'Breakfast', 'Lunch', 'Dinner'
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
        let reqBody = {
            name: this.state.name,
            recipeID: this.state.recipeID,
            authorID: this.state.authorID,
            category: this.state.category,
            cuisine: this.state.cuisine,
            difficulty: this.state.difficulty,
            ingredients: this.state.ingredients,
            instructions: this.state.instructions,
            cookTime: this.state.cookTime,
            vegetarian: this.state.vegetarian,
            vegan: this.state.vegan,
            glutenFree: this.state.glutenFree
        }
        console.log('Recipe Name: ' + this.state.name)
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
            console.log('Error: ' + error);
        });
        // e.preventDefault()
        //this.props.history.push("/home")
    }

    handleSubmit(e) {
        if (this.refs.name.value === '') {
            alert('Title is required');
        } else {
            this.setState({
                newRecipe: {
                    id: uuid.v4(),
                    name: this.refs.name.value,
                    recipeID: this.refs.recipeID.value,
                    authorID: this.refs.authorID.value,
                    category: this.refs.category.value,
                    cuisine: this.refs.cuisine.value,
                    difficulty: this.refs.difficulty.value,
                    ingredientArray: this.refs.ingredientArray.value,
                    instructions: this.refs.instructions.value,
                    cookTime: this.refs.cookTime.value,
                    vegetarian: this.refs.vegetarian.value,
                    vegan: this.refs.vegan.value,
                    glutenFree: this.refs.glutenFree.value
                }
            }, function() {
                //console.log(this.state);
                this.props.newRecipe(this.state.newRecipe);
            });
        }
        e.preventDefault();
    }

    handleChangeName(event) {
        this.setState({
            name: event.target.value
        })
    }

    handleChangeRecipeID(event) {
        this.setState({
            recipeID: event.target.value
        })
    }

    handleChangeAuthorID(event) {
        this.setState({
            authorID: event.target.value
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
            vegetarian: event.target.value
        })
    }

    handleChangeVegan(event) {
        this.setState({
            vegan: event.target.value
        })
    }

    handleChangeGlutenFree(event) {
        this.setState({
            glutenFree: event.target.value
        })
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

        const {
            complete
        } = this.state

        return (<div className="backgroundStyle">
            <h3>New Recipe</h3>
            <form id="newRecipeForm" onSubmit={this.postRecipe}>
                <Prompt when={!complete} message={location => (`Are you sure you want to go to ${location.pathname} before finishing your recipe post?`)}/>
                <div>
                    <label>Recipe Name</label><br/>
                    <input type="text" name="recipeTitleField" value={this.state.name} onChange={this.handleChangeName}/>
                </div>
                <div>
                    <label>Recipe ID</label><br/>
                    <input type="text" name="recipeIDField" value={this.state.recipeID} onChange={this.handleChangeRecipeID}/>
                </div>
                <div>
                    <label>Author ID</label><br/>
                    <input type="text" name="authorIDField" value={this.state.authorID} onChange={this.handleChangeAuthorID}/>
                </div>
                <div>
                    <label>Category</label><br/>
                    <select ref="category" name="categoryField" value={this.state.category} onChange={this.handleChangeCategory}>
                        {categoryOptions}
                    </select>
                </div>
                <div>
                    <label>Cuisine</label><br/>
                    <select ref="cuisine" name="ethnicityField" value={this.state.cuisine} onChange={this.handleChangeEthnicity}>
                        {cuisineOptions}
                    </select>
                </div>
                <div>
                    <label>Difficulty</label><br/>
                    <select ref="difficulty" name="difficultyField" value={this.state.difficulty} onChange={this.handleChangeDifficulty}>
                        {difficultyOptions}
                    </select>
                </div>
                <div>
                    <label>Ingredients</label><br/>
                    <input type="text" ref="ingredientArray" name="ingredientsField" value={this.state.ingredients} onChange={this.handleChangeIngredients}/>
                </div>
                <div>
                    <label>Instructions</label><br/>
                    <input type="text" ref="instructions" name="instructionsField" value={this.state.instructions} onChange={this.handleChangeInstructions}/>
                </div>
                <div>
                    <label>Cook Time</label><br/>
                    <input type="text" ref="cookTime" name="cookTimeField" value={this.state.cookTime} onChange={this.handleChangeCookTime}/>
                </div>
                <div>
                    <label>Vegetarian</label><br/>
                    <input type="checkbox" ref="vegetarian" name="vegetarianCheck" value={this.state.vegetarian} onChange={this.handleChangeVegetarian}/>
                </div>
                <div>
                    <label>Vegan</label><br/>
                    <input type="checkbox" ref="vegan" name="veganCheck" value={this.state.vegan} onChange={this.handleChangeVegan}/>
                </div>
                <div>
                    <label>Gluten Free</label><br/>
                    <input type="checkbox" ref="glutenFree" name="glutenCheck" value={this.state.glutenFree} onChange={this.handleChangeGlutenFree}/>
                </div>
                <br/>
                <button id="newRecipeButton" form="newRecipeForm" type="submit">Submit</button>
                <br/>
                <h3>{this.state.submissionStatus}</h3>
            </form>
        </div>);
    }
}

// NewRecipe.propTypes = {
//     categories: React.PropTypes.array,
//     newRecipe: React.PropTypes.func
// }

export default NewRecipe;

/*  From Textbook App
postBook = () => {
    this.preventDefault()
    this.target.reset()
    this.setState({
        complete: false
    })
    console.log('courseCode = ' + this.state.courseCode)
    console.log('courseLevel = ' + this.state.courseLevel)
    console.log('course = ' + this.state.course)
    fetch(`/user/${this.state.userID}/books/newBook/${this.state.isbn}/${this.state.condition}/${this.state.teacher}/${this.state.courseCode}/${this.state.course.substr(-3)}/${this.state.price}`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(this.setState({
        submissionStatus: `Post successfully created`
    }))
        .catch((ex) => {
        console.log('parsing failed', ex)
    })
    this.props.history.push("/sellerHub")
}
*/