const express = require('express');
const app = express();
const path = require('path');
let fetch = require('node-fetch');

const generatePassword = require('password-generator'); //tutorial

app.set('port', (process.env.PORT || 5000));
app.use(express.static(path.join(__dirname, '/client/build')));

/*
Scenarios:
	
*/


//Primary recipe object
class Recipe {
	constructor(name, category, ethnicity, difficulty, ingredients, instructions, cookTime, vegetarian, vegan, glutenFree) {
		this.name = name;		           	    	//string
		this.category = category;         	    	//string
		this.ethnicity = ethnicity;       	    	//string
		this.difficulty = difficulty;  				//string
		this.ingredientArray = ingredientArray;     //array of Ingredient objects
		this.instructions = instructions;   		//string (maybe array?)
		this.cookTime = cookTime;           		//integer
		this.vegetarian = vegetarian;       		//boolean
		this.vegan = vegan;                 		//boolean
		this.glutenFree = glutenFree;       		//boolean
	}
}

//contains information on one ingredient and the quantity required in the recipe
class Ingredient {
	constructor(ingredient, quantity, unit) {
		this.ingredient = ingredient;		//string
		this.quantity = quantity;		    //integer
		this.unit = unit;                   //string (unit of measure)
	}
}

//object for comments/review section
class Review {
	constructor(id, author, rating, comment) {
		this.id = id;					    //integer 
		this.author = author;				//string (possibly User.id)
		this.rating = rating;				//integer (rating between 1 and 5 inclusive)
		this.comment = comment;				//string
	}
}

//post object that contains Recipe
class RecipePost {
	constructor(id, recipe, author, rating, picture) {
		this.id = id;						//integer
		this.recipe = recipe;				//recipe object
		this.author = author;				//string (or possibly User.id)
		this.rating = rating;				//object with ratings and comments
		this.picture = picture;             //image
	}
}

class User {
	constructor(id, name, email, recipes) {
		this.id = id;					    //integer
		this.name = name;					//string
		this.email = email;					//string
		this.recipes = recipes;				//array of RecipePost objects
	}
}

// Put all API endpoints under '/api' 		//tutorial
app.get('/api/passwords', (req, res) => {	//tutorial
  const count = 5;							//tutorial
  // Generate passwords						//tutorial
  const passwords = Array.from(Array(count).keys()).map(i =>	
    generatePassword(12, false)				//tutorial
  )											//tutorial
  // Return them as json					//tutorial
  res.json(passwords);						//tutorial
  console.log(`Sent ${count} passwords`);	//tutorial
});









//?
//app.get('/', function(request, response) {
//  response.render('pages/index')
//});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
