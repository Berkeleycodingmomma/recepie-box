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

    cuisine = req.params.cuisine;
    const queryURL = `https://api.spoonacular.com/recipes/complexSearch?&cuisine=${cuisine}&apiKey=${API_KEY}`;

    const response = await axios.get(queryURL);

    const dishes = response.data.results;

    res.render("recipes", {
        dishes,
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


// Route to render individual recipe page
router.get("/recipe/:id", withAuth, async (req, res) => {

    const params = req.params.id.split("_");
    const id = params[0];
    let favorite = false;
    if (params.length > 1) {
        favorite = true;
    }

    const instructionsURL = `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${API_KEY}`
    const nutritionURL = `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${API_KEY}`
    const infoURL = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;

    const instructions = await axios.get(instructionsURL);
    const responseNutritions = await axios.get(nutritionURL);
    const nutritions = responseNutritions.data;

    const responseInfo = await axios.get(infoURL);
    let instr = "";
    if (instructions.data.length > 0) {
        instr = instructions.data[0].steps;
    }

    const title = responseInfo.data.title;
    const servings = responseInfo.data.servings;
    const readyInMinutes = responseInfo.data.readyInMinutes;
    const imgSource = responseInfo.data.image;

    const result = {
        title: title, servings: servings, readyInMinutes: readyInMinutes, imgSource: imgSource, instructions: instr, ingredients: nutritions.ingredients, nutrients:
            nutritions.nutrients
    };

    res.render("recipe", {
        result,
        logged_in: req.session.logged_in,
        favorite: favorite
    });


});


module.exports = router;