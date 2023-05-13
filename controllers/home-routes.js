const axios = require('axios');

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
router.get("/recipes/:cuisine", withAuth, async (req, res) => {
    // Get the cuisine parameter from the URL
    cuisine = req.params.cuisine;
    // Construct the query URL for the Spoonacular API
    const queryURL = `https://api.spoonacular.com/recipes/complexSearch?&cuisine=${cuisine}&apiKey=${API_KEY}`;
    // Send a GET request to the Spoonacular API and retrieve the response
    const response = await axios.get(queryURL);
    // Extract the dishes data from the response
    const dishes = response.data.results;
    // Render the "recipes" view with the dishes data and logged_in status
    res.render("recipes", {
        dishes,
        logged_in: req.session.logged_in,
    });

});


// Route to render individual recipe page
router.get("/recipe/:id", withAuth, async (req, res) => {
    // Get the recipe id from the URL
    const id = req.params.id;
    let favorite = false;
    // Check if the recipe exists in the database and if it is a favorite for the current user
    const recipeData = await Recipe.findOne({ where: { spoon_id: id } });
    if (recipeData) {
        const recipe = recipeData.get({ plain: true });
        const favoriteData = await Favorite.findOne({ where: { recipe_id: recipe.id, user_id: req.session.user_id } });
        if (favoriteData) {
            favorite = true;
        }
    }
    // Construct the URLs for fetching instructions, nutrition, and recipe information from the Spoonacular API
    const instructionsURL = `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${API_KEY}`;
    const nutritionURL = `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${API_KEY}`;
    const infoURL = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;
    // Send GET requests to the Spoonacular API to retrieve instructions, nutrition, and recipe information
    const instructions = await axios.get(instructionsURL);
    const responseNutritions = await axios.get(nutritionURL);
    const responseInfo = await axios.get(infoURL);


    // Extract the necessary data from the API responses
    const nutritions = responseNutritions.data;
    let instr = "";
    if (instructions.data.length > 0) {
        instr = instructions.data[0].steps;
    }
    const title = responseInfo.data.title;
    const servings = responseInfo.data.servings;
    const readyInMinutes = responseInfo.data.readyInMinutes;
    const imgSource = responseInfo.data.image;

    // Create a result object with the extracted data
    const result = {
        title: title,
        servings: servings,
        readyInMinutes: readyInMinutes,
        imgSource: imgSource,
        instructions: instr,
        ingredients: nutritions.ingredients,
        nutrients: nutritions.nutrients
    };

    // Render the "recipe" view with the result data, logged_in status, and favorite status
    res.render("recipe", {
        result,
        logged_in: req.session.logged_in,
        favorite: favorite
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

module.exports = router;