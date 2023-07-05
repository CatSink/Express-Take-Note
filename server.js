const express = require ('express');
const fs = require ('./helpers/fsUtils');
//import api and html routes
const html = require('./routes/htmlRoutes.js');
const api = require('./routes/apiRoutes.js');
//Heroku environment adaptation
const PORT = process.env.port || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api',api);
app.use('/', html);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);