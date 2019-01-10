import React from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';
import Home from './Pages/home';
import Login from './Pages/login';
import NewRecipe from './Pages/NewRecipePage';
import Recipes from './Pages/RecipesPage';
import RecipeView from './Components/RecipeView/RecipeView';

const App = () => (<main>
    <Switch>
        <Route exact={true} path='/' component={Login}/>
        <Route path='/home' component={Home}/>
        <Route path='/NewRecipe' component={NewRecipe}/>
        <Route path='/Recipes' component={Recipes}/>
        <Route path='/Recipes/view' component={RecipeView}/>
    </Switch>
</main>)

export default App;