const express = require('express');
const myParser = require('body-parser')
const fetcher = require('express-param');
const app = express();
app.use(fetcher());

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
    constructor(name, category, ethnicity, difficulty, ingredientArray, instructions, cookTime, vegetarian, vegan, glutenFree) {
        this.name = name; //string
        this.category = category; //string
        this.ethnicity = ethnicity; //string
        this.difficulty = difficulty; //string
        this.ingredientArray = ingredientArray; //array of Ingredient objects
        this.instructions = instructions; //string (maybe array?)
        this.cookTime = cookTime; //integer
        this.vegetarian = vegetarian; //boolean
        this.vegan = vegan; //boolean
        this.glutenFree = glutenFree; //boolean
    }
}

//post object that contains Recipe
class RecipePost {
    constructor(id, recipe, author, rating) {
        this.id = id; //integer
        this.recipe = recipe; //recipe object
        this.author = author; //User object
        this.rating = rating; //object with ratings and comments
        //	this.picture = picture;             image will be added later
    }
}

//contains information on one ingredient and the quantity required in the recipe
class Ingredient {
    constructor(ingredient, quantity, unit) {
        this.ingredient = ingredient; //string
        this.quantity = quantity; //integer
        this.unit = unit; //string (unit of measure)
    }
}

//object for comments/review section
class Review {
    constructor(id, author, rating, comment) {
        this.id = id; //integer
        this.author = author; //User object
        this.rating = rating; //integer (rating between 1 and 5 inclusive)
        this.comment = comment; //string
    }
}

class User {
    constructor(id, name, email) {
        this.id = id; //integer
        this.name = name; //string
        this.email = email; //string
        this.recipes = []; //array of RecipePost objects
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

//var urlencodedparser = myParser.urlencoded({extended: false});
app.use(myParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
//test data
let testUser = new User(8675309, 'Jenny27', 'tommy.tutone@hotmail.net');
let testUserArray = [testUser];
let testSpaghetti = new Ingredient('Spaghetti', 200, 'g');
let testBeef = new Ingredient('Beef', 100, 'g');
let testSauce = new Ingredient('Tomato Sauce', 10, 'fl oz')
let testIngredientArray = [testSpaghetti, testBeef, testSauce];
let testRecipe = new Recipe('Spaghetti and Meatballs', 'Dinner', 'Italian', 'Beginner', testIngredientArray, '(1) Form meat into balls\n(2) Cook spaghetti\n(3) Slap it all together', 30, false, false, false);
let testReview = new Review(123456, testUser, 5, 'Very spice meatball.  Dont worry about why Im reviewing my own food');
let testRecipePost = new RecipePost(696969, testRecipe, testUser, [testReview]);
let standInDB = [testRecipePost];

// Creator - view a user's recipes
app.get('/recipes/user/:userID', function(req, res, next) {
    let requiredParams = ['userID'];
    let optionalParams = ['number:userID|=0'];
    let options = req.fetchParameter(requiredParams, optionalParams);
    let userSearchID = options.userID;
    let itemFound = false;
    retRecipes = [];

    //Search the recipe database for matching user ids
    standInDB.map(RP => {
        if (RP.author.id == userSearchID) {
            retRecipes.push(RP);
            itemFound = true;
        }
    });

    if (itemFound) {
        res.send(JSON.stringify(retRecipes));
        return;
    }
    res.send('No recipes found for requested user id');
});

/* ====== HELPFUL LINKS =======================
https://expressjs.com/en/guide/routing.html
https://www.npmjs.com/package/express-param
https://github.com/expressjs/express/issues/699
https://stackoverflow.com/questions/15134199/how-to-split-and-modify-a-string-in-nodejs
============================================= */

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
    let userID = Number(req.body.authorIDField);
    let category = String(req.body.categoryField);
    let ethnicity = String(req.body.ethnicityField);
    let difficulty = String(req.body.difficultyField);
    let instructions = String(req.body.recipeInstructionsField);
    let cookTime = Number(req.body.cookTimeField);
    let vegetarian = false;
    let vegan = false;
    let glutenFree = false;
    if (req.body.vegetarianCheck == "TRUE") {
        vegetarian = true;
    };
    if (req.body.veganCheck == "TRUE") {
        vegan = true;
    };
    if (req.body.glutenCheck == "TRUE") {
        glutenFree = true;
    };
    /*
    let newRecipe = new Recipe(recipeName, category, ethnicity, difficulty, ingArray, instructions, cookTime, vegetarian, vegan, glutenFree);
    let newPost = new RecipePost(recipeID, userID,

    tempVariable
    newRecipe,
    []);
    standInDB.push(newPost);
    */
    res.sendFile(__dirname + '/client/public/NewRecipe.html')
});

// Function for searching by post id
app.get('/recipes/:postID', function(req, res) {
    let recipeSearchID = Number(req.params.postID);
    let itemFound = false;
    retRecipes = [];

    // Search the database for a post with matching ID
    standInDB.map(RP => {
        if (RP.id == recipeSearchID) {
            retRecipes.push(RP);
            itemFound = true;
        }
    });

    if (itemFound) {
        res.send(JSON.stringify(retRecipes));
        return;
    }
    res.send('No recipes found with requested id');
});

// Return reviews of a recipe using the recipe ID as a search term
app.get('/recipes/:postID/reviews', function(req, res) {
    let recipeSearchID = Number(req.params.postID);
    let itemFound = false;
    retReviews = [];

    // Search the database for a post with matching ID
    standInDB.map(RP => {
        if (RP.id == recipeSearchID) {
            retReviews = RP.rating;
            itemFound = true;
        }
    });

    if (itemFound) {
        res.send(JSON.stringify(retReviews));
        return;
    }
    res.send('No recipes found with requested id');
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
