import React from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';
import Login from './Pages/login';
import NewRecipePage from './Pages/NewRecipePage';
import AllRecipesPage from './Pages/AllRecipesPage';
import FavoriteRecipesPage from './Pages/FavoriteRecipesPage';
import RecipeItemPage from './Pages/RecipeItemPage';
import RecipeEditItemPage from './Pages/RecipeEditItemPage';
import NavBar from './Components/NavBar/NavBar';

const App = () => (<main>
    <NavBar/>
    <Switch>
        <Route exact={true} path='/' component={Login}/>
        <Route path='/NewRecipe' component={NewRecipePage}/>
        <Route path='/Recipe/:recipeID' component={RecipeItemPage}/>
        <Route path='/Recipe/edit/:recipeID' component={RecipeEditItemPage}/>
        <Route path='/Recipes/all' component={AllRecipesPage}/>
        <Route path='/Recipes/favorites' component={FavoriteRecipesPage}/>
    </Switch>
</main>)

export default App;