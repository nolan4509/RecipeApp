const express = require('express');
const myParser = require('body-parser')
const app = express();

const path = require('path');
let fetch = require('node-fetch');

const generatePassword = require('password-generator'); //tutorial

app.set('port', (process.env.PORT || 5000));
app.use(express.static(path.join(__dirname, '/client/build')));

/* New Comment
Scenarios:
	(Creators)
		- View a users recipes
			GET /recipes/user/:userID
		- Create and post a Recipe
			POST /newRecipe
		- Update an existing recipe
			PUT /recipes/update/user/:userID
		- Remove an existing recipe
			DELETE /recipes/deleteRecipe/user/:userID
	(Consumers)
		- View a recipe
			GET /recipes/:postID
		- View all reviews for a recipe
			GET /recipes/:postID/reviews
		- Create a review
			POST /recipes/:postID/reviews/user/:userName/newReview
		- Update an existing review
			PUT /recipes/:postID/reviews/user/:userName/update/:reviewID
		- Remove an existing review
			DELETE /recipes/:postID/reviews/:reviewID
	(Both)
		- Create a new User account
			POST /add/user/:userName/
*/

//Primary recipe object
class Recipe {
    constructor(recipeID, authorID, name, category, ethnicity, difficulty, ingredients, instructions, cookTime, vegetarian, vegan, glutenFree, rating) {
        this.recipeID = recipeID; //integer
        this.authorID = authorID; //integer
        this.name = name; //string
        this.category = category; //string
        this.ethnicity = ethnicity; //string
        this.difficulty = difficulty; //string
        this.ingredients = ingredients; //String of ingredients (To be changed later)
        this.instructions = instructions; //string (maybe array?)
        this.cookTime = cookTime; //integer
        this.vegetarian = vegetarian; //boolean
        this.vegan = vegan; //boolean
        this.glutenFree = glutenFree; //boolean
        this.rating = rating; //object with ratings and comments
    }
}

class User {
    constructor(id, name, email) {
        this.id = id; //integer
        this.name = name; //string
        this.email = email; //string
        this.recipePosts = []; //store integers of the post IDs they currently own
        //this.recipes = []; array of RecipePost objects
    }
}

// contains information on one ingredient and the quantity required in the recipe
// class Ingredient {
//     constructor(ingredient, quantity, unit) {
//         this.ingredient = ingredient; string
//         this.quantity = quantity; integer
//         this.unit = unit; string (unit of measure)
//     }
// }

//object for comments/review section
// class Review {
//     constructor(id, author, rating, comment) {
//         this.id = id; integer
//         this.author = author; User object
//         this.rating = rating; integer (rating between 1 and 5 inclusive)
//         this.comment = comment; string
//     }
// }

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

function updateUsers() { //load users from firebase to userArray
    userDatabase.once('value', function(snap) {
        snap.forEach(function(childSnap) {
            userArray[userArray.length] = new User(childSnap.val().userinfo.name, childSnap.val().userinfo.id, childSnap.val().userinfo.email, childSnap.val().userinfo.recipes)
        });
    });
}
function updateRecipes() { //load recipes from firebase into recipeArray
    recipeDatabase.once('value', function(snap) {
        snap.forEach(function(childSnap) {
            recipeArray[recipeArray.length] = new Recipe(childSnap.val().recipe.id, childSnap.val().recipe.author, childSnap.val().recipe.name, childSnap.val().recipe.category, childSnap.val().recipe.ethnicity, childSnap.val().recipe.difficulty, childSnap.val().recipe.ingredients, childSnap.val().recipe.instructions, childSnap.val().recipe.cookTime, childSnap.val().recipe.vegetarian, childSnap.val().recipe.vegan, childSnap.val().recipe.glutenFree, childSnap.val().recipe.rating);
        });
    });
}

//var urlencodedparser = myParser.urlencoded({extended: false});
app.use(myParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
//test data
let testUser = new User(8675309, 'Jenny27', 'tommy.tutone@hotmail.net', []);
let userArray = [];
userArray[0] = testUser;
let testRecipe = new Recipe(1, 'John Smith', 'Spaghetti and Meatballs', 'Dinner', 'Italian', 'Beginner', 'Here are a bunch of ingredients', '(1) Form meat into balls\n(2) Cook spaghetti\n(3) Slap it all together', 30, false, false, false, 5);
let recipeArray = [];
recipeArray[0] = testRecipe;

/* // let testSpaghetti = new Ingredient('Spaghetti', 200, 'g');
// let testBeef = new Ingredient('Beef', 100, 'g');
// let testSauce = new Ingredient('Tomato Sauce', 10, 'fl oz';
// let testIngredientArray = [];
// testIngredientArray[0] = testSpaghetti, testBeef, testSauce;
// let testRecipe = new Recipe(1, 'John Smith', 'Spaghetti and Meatballs', 'Dinner', 'Italian', 'Beginner', 'Here are a bunch of ingredients', '(1) Form meat into balls\n(2) Cook spaghetti\n(3) Slap it all together', 30, false, false, false, 5);
// let testReview = new Review(123456, testUser, 5, 'Very spice meatball.  Dont worry about why Im reviewing my own food');
// let testRecipePost = new RecipePost(696969, testRecipe, testUser, [testReview]);
// let recipeArray = [];
// recipeArray[0] = testRecipe; */

updateUsers(); //loads users from firebase into userArray
updateRecipes(); //loads recipePosts from firebase into recipeArray

/* ====== HELPFUL LINKS =======================
https://expressjs.com/en/guide/routing.html
https://www.npmjs.com/package/express-param
https://github.com/expressjs/express/issues/699
https://stackoverflow.com/questions/15134199/how-to-split-and-modify-a-string-in-nodejs
============================================= */

//Both - Create new user account name id email bookpossts
app.post('/add/user/:userName/:userID/:email', function(req, res) {
    let id = String(req.params.userID);
    let name = String(req.params.userName);
    let email = String(req.params.email);

    userArray[userArray.length] = new User(id, name, email);
    database.child('Users/' + `${userID}`).set({ //store into firebase
        userinfo: userArray[userArray.length - 1]
    });
    res.send(userArray[userArray.length - 1]);
});

//variable argument test
app.get('/newRecipe', function(req, res) {
    res.sendFile(__dirname + '/client/public/NewRecipe.html');
});

// Creator - Create and post a Recipe
app.post('/newRecipe', function(req, res) {
    console.log(req.body);
    let recipeTitle = String(req.body.recipeTitleField);
    //console.log(recipeTitle);
    let recipeID = Number(req.body.recipeIDField);
    let authorID = Number(req.body.authorIDField);
    let category = String(req.body.categoryField);
    let ethnicity = String(req.body.ethnicityField);
    let difficulty = String(req.body.difficultyField);
    let ingredients = String(req.body.ingredientsField);
    let instructions = String(req.body.recipeInstructionsField);
    let cookTime = Number(req.body.cookTimeField);
    let vegetarian = false;
    let vegan = false;
    let glutenFree = false;

    // dummy placeholder
    let rating = 5;
    if (req.body.vegetarianCheck == "TRUE") {
        vegetarian = true;
    };
    if (req.body.veganCheck == "TRUE") {
        vegan = true;
    };
    if (req.body.glutenCheck == "TRUE") {
        glutenFree = true;
    };
    let user = null;

    userArray.map(usr => {
        if (usr.id === authorID) {
            user = usr;
        }
    });
    if (user === null) {
        res.send("User not found");
        return;
    }
    //Careful with below...might prove to contain an error if recipeArray empty
    let recipeIndex = recipeArray[recipeArray.length - 1].id + 1; //add 1 to most recent recipe so all recipeIds are unique
    recipeArray[recipeArray.length] = new Recipe(recipeID, authorID, recipeTitle, category, ethnicity, difficulty, ingredients, instructions, cookTime, vegetarian, vegan, glutenFree, rating);
    user.recipePosts[user.recipePosts.length] = recipeIndex;

    database.child('Recipes/' + `${recipeIndex}`).set({
        recipe: recipeArray[recipeArray.length - 1]
    });
    database.child('Users/' + `${authorID}`).set({userinfo: user});
    res.send(recipeArray[recipeArray.length - 1]);
    // res.sendFile(__dirname + '/client/public/NewRecipe.html')
});

// Search for Recipe by ID
app.get('/recipes/:recipeID', function(req, res) {
    let recipeSearchID = Number(req.params.recipeID);
    retRecipe = null;

    // Search the database for a recipe with matching ID
    recipeArray.map(RP => {
        if (RP.id === recipeSearchID) {
            retRecipe = RP;
            res.send(JSON.stringify(retRecipes));
        }
    });

    if (retRecipe === null) {
        res.send('No recipes found with requested id');
    }
});

// Creator - view a user's recipes
app.get('/user/:userID/recipes', function(req, res, next) {
    let userID = Number(req.params.userID);
    let user = null;
    retRecipes = null;

    //Search the recipe database for matching user ids
    userArray.map(usr => {
        if (usr.id == userID) {
            user = usr;
        }
    });
    if (user === null) {
        res.send("User Not Found.");
        return;
    }
    let postID = user.recipePosts[user.recipePosts.length - 1];
    // console.log(user);
    // console.log(user.recipePosts.length);
    // console.log(postID);

    recipeArray.map(recipe => {
        if (recipe.id === postID) {
            retRecipes = recipe;
            res.send(JSON.stringify(retRecipes));
        }
    });

    if (retRecipes === null) {
        res.send('No recipes found for requested user id');
    }
});

// Return reviews of a recipe using the recipe ID as a search term
// app.get('/recipes/:postID/reviews', function(req, res) {
//     let recipeSearchID = Number(req.params.postID);
//     let itemFound = false;
//     retReviews = [];
//
//      Search the database for a post with matching ID
//     recipeArray.map(RP => {
//         if (RP.id == recipeSearchID) {
//             retReviews = RP.rating;
//             itemFound = true;
//         }
//     });
//
//     if (itemFound) {
//         res.send(JSON.stringify(retReviews));
//         return;
//     }
//     res.send('No recipes found with requested id');
// });

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
