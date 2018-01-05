const express = require('express');
const app = express();
const path = require('path');
let fetch = require('node-fetch');

app.set('port', (process.env.PORT || 5000));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');







app.use(express.static(path.join(__dirname, 'react/client/build')));

app.get('/', function(request, response) {
  response.render('pages/index')
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/react/client/public/index.html'));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
