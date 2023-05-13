router = require("express").Router();
const { Recipe, Favorite } = require("../../models");
const withAuth = require("../../utils/auth");

//This creates a new recipe with auth user
router.post("/", withAuth, async (req, res) => {

  const recipeData = await Recipe.findOne({ where: { spoon_id: req.body.spoon_id } });

  if (!recipeData) {
    // If recipeData is not found, add the recipe to the Recipe database
    try {
      const newRecipe = await Recipe.create({
        ...req.body,
      });
      // Create a new favorite record for the user and the newly created recipe
      const newFavorite = await Favorite.create({
        user_id: req.session.user_id,
        recipe_id: newRecipe.id
      });
      // Return the newly created favorite as a JSON response with a 200 status code
      res.status(200).json(newFavorite);

    } catch (err) {
      // If an error occurs during recipe or favorite creation, return the error as a JSON response with a 400 status code
      res.status(400).json(err);
    }
  }
  else {
    // If recipeData is found, use the existing recipe
    const recipe = recipeData.get({ plain: true });
    try {
      // Create a new favorite record for the user and the existing recipe
      const newFavorite = await Favorite.create({
        user_id: req.session.user_id,
        recipe_id: recipe.id

      });
      // Return the newly created favorite as a JSON response with a 200 status code
      res.status(200).json(newFavorite);
    } catch (err) {
      // If an error occurs during favorite creation, return the error as a JSON response with a 400 status code
      res.status(400).json(err);
    }
  }

});

router.delete('/:spoon_id', withAuth, async (req, res) => {
  // Find the recipe with the given spoon_id
  const recipeData = await Recipe.findOne({ where: { spoon_id: req.body.spoon_id } });
  const recipe = recipeData.get({ plain: true });
  // Delete the favorite that matches the user_id and recipe_id
  Favorite.destroy({
    where: {
      id: recipe.id,
      user_id: req.session.user_id,
    },
  })
    // Check if a favorite was deleted
    .then((favoriteData) => {
      if (!favoriteData) {
        res.status(404).json({ message: 'No favorite with this parameters' });
        return;
      }
      // Return the deleted favorite as a JSON response
      res.json(favoriteData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;