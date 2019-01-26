import React from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';
import Login from './Pages/login';
import NewRecipePage from './Pages/NewRecipePage';
// import RecipesPage from './Pages/RecipesPage';
import AllRecipesPage from './Pages/AllRecipesPage';
import SingleRecipePage from './Pages/SingleRecipePage';
import RecipePopUpView from './Components/RecipePopUpView/RecipePopUpView';
import NavBar from './Components/NavBar/NavBar';

const App = () => (<main>
    <NavBar/>
    <Switch>
        <Route exact={true} path='/' component={Login}/>
        <Route path='/NewRecipe' component={NewRecipePage}/>
        {/* <Route path='/Recipes' component={RecipesPage}/> */}
        <Route path='/Recipe' component={SingleRecipePage}/>
        <Route path='/Recipes/all' component={AllRecipesPage}/>
        <Route path='/Recipes/view' component={RecipePopUpView}/>
    </Switch>
</main>)

export default App;