require('dotenv').config();
API_KEY = process.env.API_KEY;

const router = require("express").Router();
const {
    Recipe,
    User,
    Favorite

} = require("../models");
const withAuth = require("../utils/auth");

// Route to render homepage
router.get("/", async (req, res) => {
    res.render("homepage", {
        logged_in: req.session.logged_in,
    });

});

// Route to render homepage
router.post("/recipes", withAuth, async (req, res) => {
    console.log("I am at recipes");
    console.log(req.cuisine);
    cuisine = req.cuisine;
    console.log(API_KEY);
    const queryURL = `https://api.spoonacular.com/recipes/complexSearch?&cuisine=${cuisine}&apiKey=${API_KEY}`;
    const response = await fetch(queryURL);
    const recipeData = await response.json();
    console.log(recipeData);
    const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));
    res.render("recipes", {
        recipes,
        logged_in: req.session.logged_in,
    });

});
router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/dashboard");
        return;
    }
    res.render("login");
});
router.get("/signup", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/dashboard");
        return;
    }
    res.render("signup");
});
/*

// Route to render individual recipe page
router.get("/recipe/:id", withAuth, async (req, res) => {
    try {
        // Find recipe by ID with associated username and comments with associated usernames
        const recipeData = await recipe.findByPk(req.params.id, {
            include: [{
                model: User,
                attributes: ["username"]
            },
            {
                model: Comment,
                include: [{
                    model: User,
                    attributes: ["username"]
                }],
            },
            ],
        });
        // Convert recipe data to plain JavaScript object and render recipe templates with recipe data and login status
        const recipe = recipeData.get({
            plain: true
        });
        res.render("recipe", {
            ...recipe,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to render dashboard page with all recipes by current user then finding all recipes by current user with associated usernames
router.get("/dashboard", withAuth, async (req, res) => {
    try {
        const recipeData = await recipe.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [{
                model: User,
                attributes: ["username"]
            }],
        });
        // Convert recipe data to plain JavaScript object
        const recipes = recipeData.map((recipe) => recipe.get({
            plain: true
        }));

        res.render("dashboard", {
            recipes,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//render the new recipe page
router.get("/newrecipe", (req, res) => {
    if (req.session.logged_in) {
        res.render("newrecipe");
        return;
    }
    res.redirect("/login");
});


//render the edit recipe page
router.get("/editrecipe/:id", async (req, res) => {
    try {
        const recipeData = await recipe.findByPk(req.params.id, {
            include: [{
                model: User,
                attributes: ["username"]
            },
            {
                model: Comment,
                include: [{
                    model: User,
                    attributes: ["username"]
                }],
            },
            ],
        });

        const recipe = recipeData.get({
            plain: true
        });

        res.render("editrecipe", {
            ...recipe,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
// module exports router
*/
module.exports = router;