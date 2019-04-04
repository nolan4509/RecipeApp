const express = require('express');
const myParser = require('body-parser')
const app = express();

const path = require('path');
let fetch = require('node-fetch');

const generatePassword = require('password-generator');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(path.join(__dirname, '/client/build')));


/*
    Contents:
        ~45:  class Recipe
        ~65:  class User
        ~90:  function findRecipeById()
        ~105: function updateUsers()
        ~125: function updateRecipes()
        ~150: function removeRecipe(id)
        ~165: function removeRecipeFromUser(userID, recipeID)

        ~205: GET /recipes/:recipeID
        ~225: GET /recipes/user/:userID
        ~260: GET /recipes
        ~270: GET /user/:userID
        ~280: GET /users/favorites/check/:userID/:recipeID
        ~300: GET /recipes/favorites/:userID
        ~335: POST /add/user/:userName/:userID/:email
        ~355: POST /newRecipe
        ~420: PUT /recipes/update/:recipeID
        ~485: PUT /users/favorites/:userID/:recipeID
        ~515: DELETE /recipes/remove/:recipeID
        ~530: DELETE /users/favorites/remove/:userID/:recipeID
*/





//Primary recipe object
class Recipe {
    constructor(recipeID, authorID, name, category, cuisine, difficulty, ingredients, instructions, cookTime, vegetarian, vegan, glutenFree, imageURL) {
        this.recipeID = recipeID; //String
        this.authorID = authorID; //String
        this.name = name; //String
        this.category = category; //String
        this.cuisine = cuisine; //String
        this.difficulty = difficulty; //String
        this.ingredients = ingredients; //String of ingredients (To be changed later)
        this.instructions = instructions; //String (maybe array?)
        this.cookTime = cookTime; //String
        this.vegetarian = vegetarian; //Boolean
        this.vegan = vegan; //Boolean
        this.glutenFree = glutenFree; //Boolean
        this.imageURL = imageURL; //string address of image
    }
}

//Primary User Object
class User {
    constructor(id, name, email, recipePosts, favoriteRecipes) {
        this.id = id; //String
        this.name = name; //String
        this.email = email; //String
        this.recipePosts = recipePosts; //Store integers of the post IDs they currently own
        this.favoriteRecipes = favoriteRecipes; //Array of RecipePost objects
    }
}

const firebase = require("firebase");
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDdiRz7i8b8ERm2kNPq59X1aTnyesRjr64",
    authDomain: "recipe-app-4509.firebaseapp.com",
    databaseURL: "https://recipe-app-4509.firebaseio.com",
    projectId: "recipe-app-4509",
    storageBucket: "recipe-app-4509.appspot.com",
    messagingSenderId: "491235211599"
};
firebase.initializeApp(config);

let database = firebase.app().database().ref();
let userDatabase = database.child('Users');
let recipeDatabase = database.child('Recipes');

/*
 ** Search through recipeArray by recipeID and return it
 */
function findRecipeById(id) {
    recipeArray.map(rcp => {
        if (id === rcp.recipeID) {
            return rcp;
        }
    });
    return null;
}

/*
 ** Load users from firebase to userArray
 */
function updateUsers() {
    userDatabase.once('value', function(snap) {
        snap.forEach(function(childSnap) {
            let userNode = new User(childSnap.val().userinfo.id, childSnap.val().userinfo.name, childSnap.val().userinfo.email, childSnap.val().userinfo.recipePosts, childSnap.val().userinfo.favoriteRecipes);
            let newEntry = true;
            for (var usrIndex = 0; usrIndex < userArray.length; usrIndex++) {
                if (userArray[usrIndex].id == userNode.id) {
                    userArray[usrIndex] = userNode;
                    newEntry = false;
                    break;
                }
            }
            if (newEntry) {
                userArray[userArray.length] = userNode;
            }
        });
    });
}

/*
 ** Load recipes from firebase into recipeArray
 */
function updateRecipes() {
    recipeDatabase.once('value', function(snap) {
        snap.forEach(function(childSnap) {
            let recipeNode = new Recipe(childSnap.val().recipe.recipeID, childSnap.val().recipe.authorID, childSnap.val().recipe.name, childSnap.val().recipe.category, childSnap.val().recipe.cuisine, childSnap.val().recipe.difficulty, childSnap.val().recipe.ingredients, childSnap.val().recipe.instructions, childSnap.val().recipe.cookTime, childSnap.val().recipe.vegetarian, childSnap.val().recipe.vegan, childSnap.val().recipe.glutenFree, childSnap.val().recipe.imageURL);
            let newEntry = true;
            for (var rcpIndex = 0; rcpIndex < recipeArray.length; rcpIndex++) {
                if (recipeArray[rcpIndex].recipeID == recipeNode.recipeID) {
                    recipeArray[rcpIndex] = recipeNode;
                    newEntry = false;
                    break;
                }
            }
            if (newEntry) {
                recipeArray[recipeArray.length] = recipeNode;
            }
        });
    });
}

/*
 ** Removes the recipe from recipeArray by recipeID and returns the authorID
 */
function removeRecipe(id) {
    let authorID = null;
    for (var index = 0; index < recipeArray.length; index++) {
        if (id == recipeArray[index].recipeID) {
            authorID = recipeArray[index].authorID;
            recipeArray.splice(index, 1);
            break;
        }
    }
    return authorID;
}

/*
 ** Removes recipe from userArray by userID on and database by user.recipePosts[recipeID]
 */
function removeRecipeFromUser(userID, recipeID) {
    for (var usr = 0; usr < userArray.length; usr++) {
        if (userArray[usr].id == userID) {
            let user = userArray[usr];
            for (var rcp = 0; rcp < user.recipePosts.length; rcp++) {
                if (user.recipePosts[rcp] == recipeID) {
                    user.recipePosts.splice(rcp, 1);
                    userDatabase.child(`${userID}`).update({
                        userinfo: user
                    });
                    return;
                }
            }
            return;
        }
    }
    return;
}

//var urlencodedparser = myParser.urlencoded({extended: false});
app.use(myParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
app.use(myParser.json());
//test data
let dummyUser = new User(1, 'DUMMY_DATA', 'DUMMY_DATA', [], []);
let userArray = [];
userArray[0] = dummyUser;
let dummyRecipe = new Recipe(1, 'DUMMY_DATA', 'DUMMY_DATA', 'DUMMY_DATA', 'DUMMY_DATA', 'DUMMY_DATA', 'DUMMY_DATA', 'DUMMY_DATA', 30, false, false, false, 5);
let recipeArray = [];
recipeArray[0] = dummyRecipe;

updateUsers(); // Loads users from firebase into userArray
updateRecipes(); // Loads recipePosts from firebase into recipeArray

/*--------------------------------------------------------------------------*/
/*------------------------------ GET REQUESTS ------------------------------*/
/*--------------------------------------------------------------------------*/

/*
 ** GET INDIVIDUAL RECIPE BY USING recipeID
 */
app.get('/recipes/:recipeID', function(req, res) {
    let recipeSearchID = Number(req.params.recipeID);
    retRecipe = null;

    // Search the database for a recipe with matching ID
    recipeArray.map(RP => {
        if (RP.recipeID == recipeSearchID) {
            retRecipe = RP;
            res.send(JSON.stringify(retRecipe));
            return;
        }
    });
    // If no recipe found, alert front end
    if (retRecipe === null) {
        res.send('No recipes found with requested id');
    }
});

/*
 ** GET ALL RECIPES FOR SPECIFIED USER BY USING userID
 */
app.get('/recipes/user/:userID', function(req, res) {
    let searchID = String(req.params.userID);
    let user = null;
    retRecipes = [];

    //Search the recipe database for matching user ids
    userArray.map(usr => {
        if (usr.id == searchID) {
            user = usr;
        }
    });
    // If no user found, alert front end
    if (user === null) {
        res.send("User Not Found.");
        return;
    }
    // Search through recipeArray and check if authorID of each recipe matches userID and return them
    recipeArray.map(recipe => {
        if (recipe.authorID == searchID) {
            retRecipes.push(recipe);
        }
    });
    if (retRecipes === []) {
        res.send('No recipes found for requested user id');
        return;
    }
    res.send(JSON.stringify(retRecipes));
});

/*
 ** GET ALL RECIPES IN recipeArray
 */
app.get('/recipes', function(req, res) {
    retRecipes = [];
    for (var rcp = 1; rcp < recipeArray.length; rcp++) {
        retRecipes.push(recipeArray[rcp]);
    }
    res.send(JSON.stringify(retRecipes));
});

/*
 ** GET USER BY userID
 */
app.get('/user/:userID', function(req, res) {
    userArray.map(usr => {
        if (usr.id == req.params.userID) {
            res.send(JSON.stringify(usr));
            return;
        }
    });
    res.send(false);
});

/*
 ** CHECK IF A GIVEN userID IS IN A USER'S FAVORITES
 */
app.get('/users/favorites/check/:userID/:recipeID', function(req, res) {
    userArray.map(usr => {
        if (usr.id == req.params.userID) {
            if (usr.favoriteRecipes) {
                for (var i = 0; i < usr.favoriteRecipes.length; i++) {
                    if (usr.favoriteRecipes[i] == req.params.recipeID) {
                        res.send(true);
                        return;
                    }
                }
            }
        }
    });
    res.send(false);
});

/*
 ** VIEW ALL FAVORITES FOR A USER BY userID
 */
app.get('/recipes/favorites/:userID', function(req, res) {
    let searchID = String(req.params.userID);
    let user = null;
    retFavoriteRecipes = [];
    userArray.map(usr => {
        if (usr.id == searchID) {
            user = usr;
        }
    });
    if (user === null) {
        res.send("User Not Found.");
        return;
    }
    // Search through a user's favoriteRecipes array comparing each favoriteID against each recipeID
    user.favoriteRecipes.map(favoriteID => {
        recipeArray.map(rcp => {
            if (favoriteID == rcp.recipeID) {
                retFavoriteRecipes.push(rcp);
            }
        });
    });
    if (retFavoriteRecipes === []) {
        res.send('No favorites found for requested user id');
        return;
    }
    res.send(JSON.stringify(retFavoriteRecipes));
});


/*--------------------------------------------------------------------------*/
/*----------------------------- POST REQUESTS ------------------------------*/
/*--------------------------------------------------------------------------*/

/*
 ** CREATE NEW USER ACCOUNT WITH userName userID email recipePosts
 */
app.post('/add/user/:userName/:userID/:email', function(req, res) {
    let id = String(req.params.userID);
    let name = String(req.params.userName);
    let email = String(req.params.email);
    userArray[userArray.length] = new User(id, name, email, [], [0]);

    //store into firebase
    database.child('Users/' + `${id}`).set({
        userinfo: userArray[userArray.length - 1]
    });
    res.send(userArray[userArray.length - 1]);
});

/*
 ** CREATE AND POST A NEW RECIPE, THEN UPDATE userArray AND recipeArray
 */
app.post('/newRecipe', function(req, res) {
    let recipeTitle = String(req.body.name);
    let recipeID = String(req.body.recipeID);
    let authorID = String(req.body.authorID);
    let category = String(req.body.category);
    let cuisine = String(req.body.cuisine);
    let difficulty = String(req.body.difficulty);
    let ingredients = String(req.body.ingredients);
    let instructions = String(req.body.instructions);
    let cookTime = String(req.body.cookTime);
    let vegetarian = false;
    let vegan = false;
    let glutenFree = false;
    let imageURL = String(req.body.imageURL);
    //let rating = 5;

    if (req.body.vegetarian) {
        vegetarian = true;
    };
    if (req.body.vegan) {
        vegan = true;
    };
    if (req.body.glutenFree) {
        glutenFree = true;
    };
    let user = null;
    userArray.map(usr => {
        if (usr.id == authorID) {
            user = usr;
        }
    });
    if (user === null) {
        res.send("User not found");
        return;
    }
    let recipeIndex = recipeArray[recipeArray.length - 1].recipeID + 1; //add 1 to most recent recipe so all recipeIds are unique
    recipeArray[recipeArray.length] = new Recipe(recipeIndex, authorID, recipeTitle, category, cuisine, difficulty, ingredients, instructions, cookTime, vegetarian, vegan, glutenFree, imageURL);

    if (user.recipePosts == null) {
        user.recipePosts = [recipeIndex];
    } else {
        user.recipePosts[user.recipePosts.length] = recipeIndex;
    }
    database.child('Recipes/' + `${recipeIndex}`).set({
        recipe: recipeArray[recipeArray.length - 1]
    });
    // console.log(user);
    database.child('Users/' + `${user.id}`).update({
        userinfo: user
    });

    updateUsers();
    updateRecipes();
    res.send(recipeArray[recipeArray.length - 1]);

    // res.sendFile(__dirname + '/client/public/NewRecipe.html')
});


/*--------------------------------------------------------------------------*/
/*------------------------------ PUT REQUESTS ------------------------------*/
/*--------------------------------------------------------------------------*/

/*
 ** UPDATE INDIVIDUAL RECIPE BY USING recipeID AND UPDATE recipeArray
 */
app.put('/recipes/update/:recipeID', function(req, res) {
    let selectedRecipe = null;
    recipeID = req.params.recipeID;
    for (var rcp = 0; rcp < recipeArray.length; rcp++) {
        if (recipeArray[rcp].recipeID == recipeID) {
            selectedRecipe = recipeArray[rcp];
            break;
        }
    }
    if (selectedRecipe == null) {
        res.send('could not find recipe with id ' + recipeID);
        return;
    }

    // these seem redundant but better safe than sorry
    if (req.body.name != null) {
        selectedRecipe.name = req.body.name;
    }
    if (req.body.category != null) {
        selectedRecipe.category = req.body.category;
    }
    if (req.body.cuisine != null) {
        selectedRecipe.cuisine = req.body.cuisine;
    }
    if (req.body.difficulty != null) {
        selectedRecipe.difficulty = req.body.difficulty;
    }
    if (req.body.ingredients != null) {
        selectedRecipe.ingredients = req.body.ingredients;
    }
    if (req.body.instructions != null) {
        selectedRecipe.instructions = req.body.instructions;
    }
    if (req.body.cookTime != null) {
        selectedRecipe.cookTime = req.body.cookTime;
    }
    if (req.body.vegetarian != null) {
        if (req.body.vegetarian == "TRUE") {
            selectedRecipe.vegetarian = true;
        } else {
            selectedRecipe.vegetarian = false;
        }
    }
    if (req.body.vegan != null) {
        if (req.body.vegan == "TRUE") {
            selectedRecipe.vegan = true;
        } else {
            selectedRecipe.vegan = false;
        }
    }
    if (req.body.glutenFree != null) {
        if (req.body.glutenFree == "TRUE") {
            selectedRecipe.glutenFree = true;
        } else {
            selectedRecipe.glutenFree = false;
        }
    }
    recipeArray[rcp] = selectedRecipe;
    database.child('Recipes/' + `${selectedRecipe.recipeID}`).update({
        recipe: selectedRecipe
    });
    res.send(selectedRecipe);
});

/*
 ** ADD RECIPE TO USERS FAVORITES
 */
app.put('/users/favorites/:userID/:recipeID', function(req, res) {
    userArray.map(usr => {
        if (usr.id == req.params.userID) {
            usr.favoriteRecipes.map(rcp => {
                if (rcp == req.params.recipeID) {
                    res.send('Recipe ' + req.params.recipeID + ' is already in favorites');
                    return;
                }
            });
            usr.favoriteRecipes.push(req.params.recipeID);
            userDatabase.child(`${usr.id}`).update({
                userinfo: usr
            });
            res.send('recipe id: ' + req.params.recipeID + ' added to favorites!');
            return;
        }
    });
    res.send('User not found');
});

/*--------------------------------------------------------------------------*/
/*---------------------------- DELETE REQUESTS -----------------------------*/
/*--------------------------------------------------------------------------*/

/*
 ** DELETE RECIPE BY USING RECIPE ID
 */
app.delete('/recipes/remove/:recipeID', function(req, res) {
    let recipeID = Number(req.params.recipeID)
    let authorID = removeRecipe(recipeID);
    if (authorID != null) {
        database.child('Recipes/' + `${recipeID}`).remove();
        // console.log('Recipe removed from firebase.');
        removeRecipeFromUser(authorID, recipeID);
        res.send("Done");
    } else { //author ID is null...
        res.send("authorID not found in database...");
    }
    return;
});

/*
 ** REMOVE RECIPE FROM USERS FAVORITES
 */
app.delete('/users/favorites/remove/:userID/:recipeID', function(req, res) {
    userArray.map(usr => {
        if (usr.id == req.params.userID) {
            for (var i = 0; i < usr.favoriteRecipes.length; i++) {
                if (usr.favoriteRecipes[i] == req.params.recipeID) {
                    usr.favoriteRecipes.splice(i, 1);
                    userDatabase.child(`${usr.id}`).update({
                        userinfo: usr
                    });
                    res.send('Done!');
                    return;
                }
            }
        }
    });
    res.send('User not found');
});

/*--------------------------------------------------------------------------*/
/*------------------------------ TO BE SORTED ------------------------------*/
/*--------------------------------------------------------------------------*/

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(app.get('port'), function() {
    console.log('The Best Recipe app is now running on port', app.get('port'));
});