import React from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';
import Login from './Pages/login';
import NewRecipePage from './Pages/NewRecipePage';
import AllRecipesPage from './Pages/AllRecipesPage';
import RecipeItemPage from './Pages/RecipeItemPage';
import NavBar from './Components/NavBar/NavBar';

const App = () => (<main>
    <NavBar/>
    <Switch>
        <Route exact={true} path='/' component={Login}/>
        <Route path='/NewRecipe' component={NewRecipePage}/>
        <Route path='/Recipe/:recipeID' component={RecipeItemPage}/>
        <Route path='/Recipes/all' component={AllRecipesPage}/>
    </Switch>
</main>)

export default App;