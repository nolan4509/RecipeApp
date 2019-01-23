import React, {
    Component
} from 'react';
import Recipes from '../Components/Recipes/Recipes';
import './styles.css';

class SingleRecipePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: this.props.recipe,
            image: this.getImage()
        }
    }

    getImage() {
        let {
            state
        } = this;
        this.state['image'] = this.props.recipe.imageURL;
        this.setState(state);
    }

    render() {
        return (
            <div>
            <h1 classname="recipeName">{this.state.recipe.name}</h1>
            <img src={ this.state.image } alt="recipeImage" width="500" height="500"/>
        </div>
        );
    }

}

export default SingleRecipePage;