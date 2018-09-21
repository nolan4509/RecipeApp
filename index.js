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
    constructor(id, name, email, recipePosts) {
        this.id = id; //integer
        this.name = name; //string
        this.email = email; //string
        this.recipePosts = recipePosts; //store integers of the post IDs they currently own
        //this.recipes = []; array of RecipePost objects
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
let recipePostDatabase = database.child('Recipes');

function updateUsers() { //load users from firebase to userArray
    userDatabase.once('value', function(snap) {
        snap.forEach(function(childSnap) {
            userArray[userArray.length] = new User(childSnap.val().userinfo.name, childSnap.val().userinfo.id, childSnap.val().userinfo.email, childSnap.val().userinfo.recipes)
        });
    });
}
function updateRecipes() { //load bookposts from firebase into bookPostArray
    recipePostDatabase.once('value', function(snap) {
        snap.forEach(function(childSnap) {
            recipePostArray[recipePostArray.length] = new RecipePost(childSnap.val().recipepost.id, childSnap.val().recipepost.recipe, childSnap.val().recipepost.author, childSnap.val().recipepost.rating);
        });
    });
}

//var urlencodedparser = myParser.urlencoded({extended: false});
app.use(myParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
//test data
let testUser = new User(8675309, 'Jenny27', 'tommy.tutone@hotmail.net', []);
let testUserArray = [];
testUserArray[0] = testUser;
let testSpaghetti = new Ingredient('Spaghetti', 200, 'g');
let testBeef = new Ingredient('Beef', 100, 'g');
let testSauce = new Ingredient('Tomato Sauce', 10, 'fl oz';
let testIngredientArray = [];
testIngredientArray[0] = testSpaghetti,
testBeef,
testSauce;
let testRecipe = new Recipe('Spaghetti and Meatballs', 'Dinner', 'Italian', 'Beginner', testIngredientArray, '(1) Form meat into balls\n(2) Cook spaghetti\n(3) Slap it all together', 30, false, false, false);
let testReview = new Review(123456, testUser, 5, 'Very spice meatball.  Dont worry about why Im reviewing my own food');
let testRecipePost = new RecipePost(696969, testRecipe, testUser, [testReview]);
let standInDB = [];
standInDB[0] = testRecipePost;

updateUsers(); //loads users from firebase into userArray
updateRecipes(); //loads recipePosts from firebase into standInDB

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

// EVERYTHING BELOW IS FROM THE TEXTBOOK APP FOR REFERENCE
/*
const express = require('express');
const path = require('path');
const app = express();
let fetch = require('node-fetch');



Scenarios:
	(Buyers)
		-Search for a Course
			GET /courses/:courseCode/:courseLevel
		-Retrieve textbook post information
			GET /posts/:postID
		-Request to purchase textbook
			GET /purchase/:postID (This will be the page that has the 'Send' button to send the seller an email requesting to purchase the textbook)
	(Sellers)
		-Retrieve all books user is selling
			GET /user/:userID/books
		-Remove a textbook post for a book that you are selling (Going to require authentication to determine correct user)
			DELETE /user/:userID/books/:postID/remove
		Create new textbook post
			POST /user/:userID/books/newBook/:isbnNum/:condition/:teacher/:courseCode/:courseLevel/:price
		Update a textbook post
			PUT /user/:userID/books/newBook/:isbnNum/:condition/:teacher/:courseCode/:courseLevel/:price/update/:postID
	(Both)
	    -Create new user account
	        POST /add/user/:userName/:userID/:email


//API Key = 10AXC8WX

class Course {
    constructor(code, level, id) {
        this.code = code.toLowerCase(); //CS, MATH, etc.
        this.level = level; //101 , 102, etc.
        this.id = id;
    }
    courseName() {
        return this.code + this.level; //CS101
    }
}

class Textbook {
    constructor(name, isbn, title, author, edition) { //The essentials
        this.name = name;
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.edition = edition;
    }
}

class User {
    constructor(name, id, email, bookPosts) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.bookPosts = bookPosts;//store integers of the post IDs they currently own
    }
}

class BookPost {
    constructor(textbook, id, condition, seller, teacherName, price, course) {
        this.textbook = textbook;
        this.id = id;
        this.condition = condition;
        this.seller = seller;
        this.teacherName = teacherName;
        this.price = price;
        this.course = course;
    }
}

const firebase = require("firebase");
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBYVmMA2jzaP7B6R3V-6xbxtJ8109C_UPk",
    authDomain: "swe432-29722.firebaseapp.com",
    databaseURL: "https://swe432-29722.firebaseio.com",
    projectId: "swe432-29722",
    storageBucket: "",
    messagingSenderId: "957222857407"
};
firebase.initializeApp(config);

let database = firebase.app().database().ref();
let userDatabase = database.child('Users');
let bookPostDatabase = database.child('Posts');

function updateUsers(){//load users from firebase to userArray
    userDatabase.once('value', function (snap) {
        snap.forEach(function (childSnap) {
            userArray[userArray.length] = new User(childSnap.val().userinfo.name, childSnap.val().userinfo.id, childSnap.val().userinfo.email, childSnap.val().userinfo.bookPosts)
        });
    });
}
function updateBookPosts(){//load bookposts from firebase into bookPostArray
    bookPostDatabase.once('value', function (snap) {
        snap.forEach(function (childSnap) {
            bookPostArray[bookPostArray.length] = new BookPost(childSnap.val().bookpost.textbook, childSnap.val().bookpost.id, childSnap.val().bookpost.condition, childSnap.val().bookpost.seller,
                childSnap.val().bookpost.teacherName, childSnap.val().bookpost.price, childSnap.val().bookpost.course);
        });
    });
}

//test data
let testCsCourse = new Course('CS', 101, 0);
let testBook = new Textbook('test book', 9871234567890, 'titletest', 'yolo', 8);
let testUser = new User('John', 'jhunt11', 'jhunt11@gmu.edu', []);
let bookPostArray = [];
bookPostArray[0] = new BookPost(testBook, 100, 'good', testUser, 'Prof. Test', 999999, testCsCourse);
let userArray = [];
userArray[0] = testUser;
//end test data

updateUsers();//loads users from firebase into userArray
updateBookPosts();//loads bookposts from firebase into bookPostArray


//Buyer - Search for a course
app.get('/courses/:courseCode/:courseLevel', function(req, res){
    let courseLevel = Number(req.params.courseLevel);
    let courseCode = String(req.params.courseCode).toLowerCase();
    let retCourses = [];
    let count = 0;

    bookPostArray.map(BP => { //search through bookPostArray for matching course
        if(BP.course.code === courseCode && BP.course.level === courseLevel){
            retCourses[count] = BP;
            count++;
        }
    });
    if(retCourses.length === 0){
        res.send("No books found");
        return;
    }
    res.send(JSON.stringify(retCourses));
});

//Buyer - Retrieve textbook post information
app.get('/posts/:postID', function(req, res){
    let postID = Number(req.params.postID);
    let retPost = null;

    bookPostArray.map(function(post) { //search bookPostArray for matching postID
        if(post.id === postID){
            retPost = post;
            res.send(JSON.stringify(retPost));
        }
    });
    if(retPost === null){
        res.send("ID Not Found.");
    }
});

//Buyer - Request to purchase textbook
//GET /courses/:postID/purchase
app.get('/purchase/:postID', function(req, res){
    let postID = Number(req.params.postID);

    let retEmail = null;

    bookPostArray.map(function(post) { //search through bookPostArray for matching course
        if(post.id === postID){
            retEmail = post.seller.email;
        }
    });
    if(retEmail === null){
        res.send("No post found.");
        return;
    }
    res.send(JSON.stringify(retEmail));
});

//Seller - Retrieve all books a user is selling
app.get('/user/:userID/books', function(req, res){
    let userID = String(req.params.userID);
    let seller = null;
    let retPost = null;
    userArray.map(function(user) { //search for user account
        if(user.id === userID){
            seller = user;
        }
    });
    if(seller === null){
        res.send("User Not Found.");
        return;
    }
    let postID = seller.bookPosts[seller.bookPosts.length - 1];
    console.log(seller);
    console.log(seller.bookPosts.length);
    console.log(postID);
    bookPostArray.map(function(post) { //search bookPostArray for matching postID
        if(post.id === postID){
            retPost = post;
            res.send(JSON.stringify(retPost));
        }
    });
    if(retPost === null){
        res.send("ID Not Found.");
    }
});

//Seller - Remove a textbook post for a book that you are selling (Going to require authentication to determine correct user)
app.delete('/user/books/:postID/remove', function(req, res){
    let postID = Number(req.params.postID);
    let postToDelete = null;
    let postIndex = null;
    for(let i in bookPostArray){ //search bookPostArray for matching postID
        if(bookPostArray[i].id === postID){
            postToDelete = bookPostArray[i];
            postIndex = i;
        }
    }
    if(postToDelete === null){
        res.send("Bookpost Not Found.");
        return;
    }
    let seller = postToDelete.seller;
    seller.bookPosts.splice(seller.bookPosts.length -1, 1);

    bookPostArray.splice(postIndex, 1);
    database.child('Posts/' + `${postID}`).remove();
    database.child('Users/' + `${seller.id}/userinfo/bookPosts/${seller.bookPosts.length - 1}`).remove();
    res.send("Done");
});

//Seller - Create new textbook post with valid ISBN
app.post('/user/:userID/books/newBook/:isbnNum/:condition/:teacher/:courseCode/:courseLevel/:price', function (req, res) {
    let userID = String(req.params.userID);
    let isbnNum = Number(req.params.isbnNum);
    let condition = String(req.params.condition);
    let teacher = String(req.params.teacher);
    let courseLevel = Number(req.params.courseLevel);
    let courseCode = String(req.params.courseCode).toLowerCase();
    let price = Number(req.params.price);
    let seller = null;

    fetch(`http://isbndb.com/api/v2/json/10AXC8WX/book/${isbnNum}`)//fetch book info
        .then(function (res) {
            return res.json();
        }).then(function (json) {
        let title = json.data[0].title;
        let edition = json.data[0].edition_info;
        let author = json.data[0].author_data[0].name;
        let textbook = new Textbook(title, isbnNum, title, author, edition);
        let course = new Course(courseCode, courseLevel, 0);
        userArray.map(function(user) { //search for user account
            if(user.id === userID){
                seller = user;
            }
        });
        if(seller === null){
            res.send("User Not Found.");
            return;
        }
        let postIndex = bookPostArray[bookPostArray.length - 1].id + 1;//add 1 to most recent post so all postIDs are unique *** - 1 then + 1?
        bookPostArray[bookPostArray.length] = new BookPost(textbook, postIndex, condition, seller, teacher, price, course);//store new post
        seller.bookPosts[seller.bookPosts.length] = postIndex;//store in sellers list
        database.child('Posts/' + `${postIndex}`).set(//persist firebase
            { bookpost: bookPostArray[bookPostArray.length - 1]
            });
        database.child('Users/' + `${userID}`).set(//persist firebase
            { userinfo: seller
            });
        res.send(bookPostArray[bookPostArray.length - 1]);
    })
        .catch(function (err) {
            if(err.code === 'ENOTFOUND'){//no internet connection
                console.log('Internet Error: ' + err);
            }
            if (err.name === 'TypeError') {//gateway timeout
                console.log("Type Error, bad data");
                res.send("Book not Found.");
            }
            else {//flags 404 and any other client error
                console.log('Error: ' + err.status + ' --- ' + err.statusText);
            }
        });
});

//Seller - Update a textbook post
app.put('/user/:userID/books/newBook/:isbnNum/:condition/:teacher/:courseCode/:courseLevel/:price/update/:postID', function (req, res) {
    let userID = String(req.params.userID);
    let isbnNum = Number(req.params.isbnNum);
    let condition = String(req.params.condition);
    let teacher = String(req.params.teacher);
    let courseLevel = Number(req.params.courseLevel);
    let courseCode = String(req.params.courseCode).toLowerCase();
    let price = Number(req.params.price);
    let postID = Number(req.params.postID);
    let seller = null;
    let bookpost = null;

    console.log(userID);
    console.log(isbnNum);
    console.log(condition);
    console.log(teacher);
    console.log(courseLevel);
    console.log(courseCode);
    console.log(price);
    console.log(postID);
    // fetch(`http://isbndb.com/api/v2/json/10AXC8WX/book/${isbnNum}`)//fetch book info
        // .then(function (res) {
            // return res.json();
        // }).then(function (json) {
        // let title = json.data[0].title;
        // let edition = json.data[0].edition_info;
        // let author = json.data[0].author_data[0].name;
        // let textbook = new Textbook(title, isbnNum, title, author, edition);
        let course = new Course(courseCode, courseLevel, 0);
        userArray.map(function(user) { //search for user account
            if(user.id === userID){
                seller = user;
            }
        });
        if(seller === null){
            console.log("user not found")
            res.send("User Not Found.");
            return;
        }
        bookPostArray.map(function(post) { //search for bookpost **WHAT IF POST DNE
            if(post.id === postID){
                bookpost = post;
            }
        });
        let textbook = bookpost.textbook;
        bookpost = new BookPost(textbook, bookpost.id, condition, seller, teacher, price, course);//store new post
        database.child('Posts/' + `${bookpost.id}`).set(//persist firebase
            { bookpost: bookpost
            });
        bookPostArray[bookPostArray.length - 1] = bookpost;
        //updateBookPosts();
        //updateUsers();
        console.log(bookpost);
        console.log("----");
        console.log(bookPostArray[bookPostArray.length - 1]);
        res.send(bookpost);
    // })
        // .catch(function (err) {
            // if(err.code === 'ENOTFOUND'){//no internet connection
               // console.log('Internet Error: ' + err);
            // }
            // if (err.name === 'TypeError') {//gateway timeout
               // console.log("Type Error, bad data");
               // res.send("Book not Found.");
            // }
            // else {//flags 404 and any other client error
               // console.log('Error: ' + err.status + ' --- ' + err.statusText);
            // }
        });
});

//Both - Create new user account name id email bookpossts
app.post('/add/user/:userName/:userID/:email', function (req, res) {
    let userID = String(req.params.userID);
    let userName = String(req.params.userName);
    let email = String(req.params.email);

    userArray[userArray.length] = new User(userName, userID, email, []);
    database.child('Users/' + `${userID}`).set(//store into firebase
        { userinfo: userArray[userArray.length - 1]
        });
    res.send(userArray[userArray.length - 1]);
});


//app.get('/', function(req, res) {
    //res.send("Hello World");
//    res.sendfile('public/login.html')
    //console.log('express');
//});

//app.use(express.static('public'));

//app.use('/static', express.static('public'));

app.use(express.static(path.join(__dirname, 'react/client/build')));



// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/react/client/public/index.html'));
});



const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Node app is running on port ${port}`);
*/
