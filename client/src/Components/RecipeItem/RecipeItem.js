import React, {Component} from 'react';
import './styles.css';

class RecipeItem extends Component {
    deleteRecipe(id) {
        this.props.onDelete(id);
    }

    render() {
        return (<li className="Recipe">
            <strong>{this.props.recipe.title}</strong>: {this.props.recipe.category}
            <a href="#" onClick={this.deleteRecipe.bind(this, this.props.recipe.id)}>X</a>
        </li>);
    }
}

// RecipeItem.propTypes = {
//     recipe: React.PropTypes.object,
//     onDelete: React.PropTypes.func
// }

export default RecipeItem;
