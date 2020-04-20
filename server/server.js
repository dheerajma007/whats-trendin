const express = require('express');
const app = express();

app.get('/welcome', (req, res) => res.send('This is a placeholder text'))

app.listen(8080)