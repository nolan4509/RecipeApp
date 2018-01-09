const express = require('express');
const app = express();
const path = require('path');
let fetch = require('node-fetch');

const generatePassword = require('password-generator'); //tutorial

app.set('port', (process.env.PORT || 5000));
app.use(express.static(path.join(__dirname, 'react/client/build')));

// Primary recipe object
class Recipe {
	constructor(name, difficulty ) {
		this.name = name;             // String
		this.difficulty = difficulty; // String
		
		
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
  res.sendFile(path.join(__dirname + '/react/client/public/index.html'));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
