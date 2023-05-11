router = require("express").Router();
const { Recipe, User, Favorite } = require("../../models");
const { truncate } = require("../../models/Favorite");
const withAuth = require("../../utils/auth");

//This creates a new recipe with auth user
router.post("/", withAuth, async (req, res) => {

  const recipeData = await Recipe.findOne({ where: { spoon_id: req.body.spoon_id } });

  // this recipe is still not in db
  if (!recipeData) {
    // add it to 
    console.log("getting here");


    try {
      const newRecipe = await Recipe.create({
        ...req.body,
      });
      const newFavorite = await Favorite.create({
        user_id: req.session.user_id,
        recipe_id: newRecipe.id
      });
      console.log(recipeData)
      res.status(200).json(newFavorite);

    } catch (err) {
      res.status(400).json(err);
    }
  }
  else {
    const recipe = recipeData.get({ plain: true });
    try {
      const newFavorite = await Favorite.create({
        user_id: req.session.user_id,
        recipe_id: recipe.id

      });

      res.status(200).json(newFavorite);
    } catch (err) {
      res.status(400).json(err);
    }
  }

});

router.delete('/:spoon_id', withAuth, async (req, res) => {
  const recipeData = await Recipe.findOne({ where: { spoon_id: req.body.spoon_id } });
  const recipe = recipeData.get({ plain: true });

  Favorite.destroy({
    where: {
      id: recipe.id,
      user_id: req.session.user_id,
    },
  })
    .then((recipeData) => {
      if (!recipeData) {
        res.status(404).json({ message: 'No favorite with this parameters' });
        return;
      }
      res.json(recipeData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;