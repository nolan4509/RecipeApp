const express = require('express');
const app = express();
const path = require('path');
let fetch = require('node-fetch');

const generatePassword = require('password-generator'); //tutorial

app.set('port', (process.env.PORT || 5000));
app.use(express.static(path.join(__dirname, '/client/build')));




// Primary recipe object
class Recipe {
	constructor(id, name, category, ethnicity, difficulty, ingredients, instructions, cookTime, rating, vegetarian, vegan, glutenFree, picture) {
		this.id = id;                       //integer
		this.name = name;		            //string
		this.category = category;           //string
		this.ethnicity = ethnicity;         //string
		this.difficulty = difficulty;  		//string
		this.ingredients = ingredients;     //separate object
		this.instructions = instructions;   //string (maybe array?)
		this.cookTime = cookTime;           //integer
		this.rating = rating;				//object with ratings and comments
		this.vegetarian = vegetarian;       //boolean
		this.vegan = vegan;                 //boolean
		this.glutenFree = glutenFree;       //boolean
		this.picture = picture;             //image
	}
}

// Put all API endpoints under '/api' 		//tutorial
app.get('/api/passwords', (req, res) => {	//tutorial
  const count = 5;							//tutorial
  // Generate some passwords				//tutorial
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
