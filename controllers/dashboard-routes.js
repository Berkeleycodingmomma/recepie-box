
const router = require("express").Router();
const {
    Recipe,
    User,
    Favorite
} = require("../models");

const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {

    try {
        const userData = await User.findByPk(req.session.user_id, {
            include: [{
                model: Recipe, through: Favorite, as: 'user_favorite',
                attributes: ['id', 'name', 'calories', 'picture_source', 'spoon_id']
            }]
        });

        const userFavoriteRecipes = userData.user_favorite.map((recipe) => recipe.dataValues);
        const favoriteDishes = [];

        for (i = 0; i < userFavoriteRecipes.length; i++) {
            favoriteDishes.push({
                id: userFavoriteRecipes[i].id, name: userFavoriteRecipes[i].name, picture_source: userFavoriteRecipes[i].picture_source,
                spoon_id: userFavoriteRecipes[i].spoon_id
            })
        }

        res.render("dashboard", {
            favoriteDishes,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;