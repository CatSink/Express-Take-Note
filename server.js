const express = require('express');
const app = express()
const PORT = process.env.PORT ||3001
const path = require('path');
app.use(express.static(path.join(_dirname,'public')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const apiRoutes = require('../routes/api.js');
const htmlRoutes = require('../routes/html.js');

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen('PORT', () => {
    console.log(`listening on http://localhost:${PORT}!`);
});    


