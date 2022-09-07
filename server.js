// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
/*Dependencies*/
const bodyParser = require('body-parser');
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

/*API Endpoints*/
// get route
app.get('/api', (req, res) => {
    //res.send('Hello world');
    //res.json(projectData);
    res.send(projectData);
});

//post route
//const data = [];
app.post('/api', addData);

function addData(req, res) {
  //data.push(req.body);
  projectData['date'] = req.body.date;
  projectData['temp'] = req.body.temp;
  projectData['content'] = req.body.feelings;
  res.send(projectData);
}

// Setup Server
const port = 8000;
const server = app.listen(port, listening);
function listening(){
    console.log("server running"); 
    console.log(`running on localhost: {$port}`);
}
