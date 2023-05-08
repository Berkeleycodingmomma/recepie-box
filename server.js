
//Below I have 
const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const routes = require("./controllers");
const sequelize = require("./config/connection");
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ helpers: require("./utils/helper")});


//Creating express app and setting port
const app = express();
const PORT = process.env.PORT || 3001;

//Setting up session obj. w/ secret, cookie, and store
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

//Here we are using middleware w/ session obj.
app.use(session(sees));

//parsing json and URL encoded data
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//Below we are serving static files images from public dir. 
app.use(express.static("public"));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");



//Middleware w/ different obj.
app.use(
    session({
        secret: process.env.SECRET,
        store: new SequelizeStore({
            db: sequelize
        }),
        resave: false,
        saveUninitialized: false,

    })
);

app.use(routes);

//Syncing seq. models w/ database and starting server
sequilize.sync({ force: false }).then(() => {
    app.listen(PPORT, () => console.log(`Listening on PORT ${PORT}`));
});