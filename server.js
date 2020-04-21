const express = require('express');
const path = require('path');
const data = require('./data');
const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/welcome', (req, res) => res.send('This is a placeholder text'));

app.get('/twitter', (req, res) => {
    data.getTwitterData(req.query.country)
    .then(function (response){
        res.status(response.status).send(response.body);
    })
    .catch(function (err){
        res.status(500).json({error : "Internal error. Could not fetch data!"});
    });
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port);
console.log(`Whats-Trendin listening on ${port}`);