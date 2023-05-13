
const router = require("express").Router();
const {
    Recipe,
    User,
    Favorite
} = require("../models");

const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {

    try {
        // Find the user data by the user_id in the session and include favorite recipes
        const userData = await User.findByPk(req.session.user_id, {
            include: [{
                model: Recipe, through: Favorite, as: 'user_favorite',
                attributes: ['id', 'name', 'calories', 'picture_source', 'spoon_id']
            }]
        });
        // Extract the favorite recipe data from the user_favorite association
        const userFavoriteRecipes = userData.user_favorite.map((recipe) => recipe.dataValues);
        const favoriteDishes = [];

        // Convert the favorite recipe data into a simplified format
        for (i = 0; i < userFavoriteRecipes.length; i++) {
            favoriteDishes.push({
                id: userFavoriteRecipes[i].id, name: userFavoriteRecipes[i].name, calories: userFavoriteRecipes[i].calories, picture_source: userFavoriteRecipes[i].picture_source,
                spoon_id: userFavoriteRecipes[i].spoon_id
            })
        }
        // Render the "dashboard" view with the favoriteDishes data and logged_in status
        res.render("dashboard", {
            favoriteDishes,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        // If an error occurs, return a 500 status code with the error
        res.status(500).json(err);
    }
});


module.exports = router;