
const router = require("express").Router();
const {
    Recipe,
    User,
    Favorite
} = require("../models");

const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
    try {
        // const recipeData = await recipe.findAll({
        //     where: {
        //         user_id: req.session.user_id
        //     },
        //     include: [{
        //         model: User,
        //         attributes: ["username"]
        //     }],
        // });
        // // Convert recipe data to plain JavaScript object
        // const recipes = recipeData.map((recipe) => recipe.get({
        //     plain: true
        // }));

        res.render("dashboard", {
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;