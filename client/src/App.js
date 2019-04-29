import React from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import NewRecipePage from './Pages/NewRecipePage';
import AllRecipesPage from './Pages/AllRecipesPage';
import Login from './Pages/login';
import RecipeItemPage from './Pages/RecipeItemPage';
import FavoriteRecipesPage from './Pages/FavoriteRecipesPage';
import QuickFixPage from './Pages/QuickFixPage'
import AdvancedFiltersPage from './Pages/AdvancedFiltersPage'


/*
** This is really the whole App component itself. Index.js will render the const App in a <App/> Tag.
** The NavBar component will always be loaded and rendered on top of all the other pages & components.
** '/' is the Login component which is the home page of the app.

Component Heirachy:

 ---> NavBar

        >------> NewRecipePage ---> NewRecipe
        ^
        >-----------------> AllRecipesPage --------------v
        ^                                                v
        ^            -------> RecipesPage ------------v  v
       App---->  Login                               Recipes  ----> RecipeItem
                   v ----> FavoriteRecipesPage -------^  ^
                   v                                     ^
                   >--------> QuickFixPage --------------^


*/

const App = () => (<main>
    <NavBar/>
    <Switch>
        <Route exact={true} path='/' component={Login}/>
        <Route path='/NewRecipe' component={NewRecipePage}/>
        <Route path='/Recipe/:recipeID' component={RecipeItemPage}/>
        <Route path='/Recipes/all' component={AllRecipesPage}/>
        <Route path='/Recipes/favorites' component={FavoriteRecipesPage}/>
        <Route path='/Recipes/quickFix' component={QuickFixPage}/>
        <Route path='/Recipes/advanced_search' component={AdvancedFiltersPage}/>
    </Switch>
</main>)

export default App;