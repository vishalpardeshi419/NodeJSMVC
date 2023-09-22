const express = require('express')
const app = express(); 
const path = require('path')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const logEvents = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

//To create a server
const PORT = process.env.PORT || 3500;

//CORS
app.use(cors(corsOptions));

//Middleware
app.use(express.urlencoded({ extended: false}));

//Middleware for Json
app.use(express.json());

//serve static files 
app.use('/', express.static(path.join(__dirname, '/public')));
// app.use('/subdir', express.static(path.join(__dirname, '/public')));

// SETUP ROUTE
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));

//Route for subdir
// app.use('/subdir', require('./routes/subdir'));
app.use('/employees', require('./routes/api/employees'));

//Page not found 404 page 
// insted of app.get 
    // app.get('/*', (req, res) => {
    // use app.all for all request
app.all('*', (req, res) => {
    res.status(404);
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if(req.accepts('json')) {
        res.json({ error: "404 Not Found"});
    } else {
        res.type('txt').send("404 Not found");
    }
})

app.use(errorHandler);

//server listen
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
