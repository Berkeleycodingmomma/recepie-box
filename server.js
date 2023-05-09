// Import required modules
const express = require('express');
const sequelize = require('./config/connection');
const path = require('path');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helper');
require('dotenv').config();

// Create Express application
const app = express();
const PORT = process.env.PORT || 3001;

// Configure session
const sess = {
    secret: 'super secret session', // Secret key for session encryption
    cookie: { maxAge: 3600000 }, // Cookie configuration (expires in 1 hour)
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize // Store session data in the Sequelize database
    })
};

// Configure Handlebars as the view engine
const hbs = exphbs.create({ helpers }); // Create an instance of Handlebars with custom helpers
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, "js")));   //this was needed  a 404 would occur, I tried linking through public but it would not work.

// Set up session middleware
app.use(session(sess));

// Set up routes
app.use(routes);

// Sync Sequelize models and start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});