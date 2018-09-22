import React, {Component} from 'react';
import './styles.css';
import uuid from 'uuid';

class NewRecipe extends Component {
    constructor() {
        super();
        this.state = {
            newRecipe: {}
        }
    }

    static defaultProps = {
        categories: [
            'Breakfast', 'Lunch', 'Dinner'
        ],
        ethnicities: [
            'American', 'Asian', 'Mexican', 'Other'
        ],
        difficulties: ['Easy', 'Medium', 'Difficult']
    }

    handleSubmit(e) {
        if (this.refs.name.value === '') {
            alert('Title is required');
        } else {
            this.setState({
                newRecipe: {
                    id: uuid.v4(),
                    name: this.refs.name.value,
                    category: this.refs.category.value,
                    ethnicity: this.refs.ethnicity.value,
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

    render() {
        let categoryOptions = this.props.categories.map(category => {
            return <option key={category} value={category}>{category}</option>
        });
        let ethnicityOptions = this.props.ethnicities.map(ethnicity => {
            return <option key={ethnicity} value={ethnicity}>{ethnicity}</option>
        });
        let difficultyOptions = this.props.difficulties.map(difficulty => {
            return <option key={difficulty} value={difficulty}>{difficulty}</option>
        });
        return (<div>
            <h3>New Recipe</h3>
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div>
                    <label>Recipe Name</label><br/>
                    <input type="text" ref="name"/>
                </div>
                <div>
                    <label>Category</label><br/>
                    <select ref="category">
                        {categoryOptions}
                    </select>
                </div>
                <div>
                    <label>Ethnicity</label><br/>
                    <select ref="ethnicity">
                        {ethnicityOptions}
                    </select>
                </div>
                <div>
                    <label>Difficulty</label><br/>
                    <select ref="difficulty">
                        {difficultyOptions}
                    </select>
                </div>
                <div>
                    <label>Ingredients</label><br/>
                    <input type="text" ref="ingredientArray"/>
                </div>
                <div>
                    <label>Instructions</label><br/>
                    <input type="text" ref="instructions"/>
                </div>
                <div>
                    <label>Cook Time</label><br/>
                    <input type="text" ref="cookTime"/>
                </div>
                <div>
                    <label>Vegetarian</label><br/>
                    <input type="text" ref="vegetarian"/>
                </div>
                <div>
                    <label>Vegan</label><br/>
                    <input type="text" ref="vegan"/>
                </div>
                <div>
                    <label>Gluten Free</label><br/>
                    <input type="text" ref="glutenFree"/>
                </div>
                <br/>
                <input type="submit" value="Submit"/>
                <br/>
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
