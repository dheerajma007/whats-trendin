const express = require('express');
const path = require('path');
const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/welcome', (req, res) => res.send('This is a placeholder text'))

app.listen(8080)