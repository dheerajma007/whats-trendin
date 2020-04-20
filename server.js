const express = require('express');
const path = require('path');
const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/welcome', (req, res) => res.send('This is a placeholder text'));

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'client/build/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port);
console.log(`Whats-Trendin listening on ${port}`);