router = require("express").Router();
const { Recipe, User, Favorite } = require("../../models");
const withAuth = require("../../utils/auth");

//This creates a new recipe with auth user
router.post("/", withAuth, async (req, res) => {

  const recipeData = await Recipe.findOne({ where: { spoon_id: req.body.spoon_id } });

  // this recipe is still not in db
  if (!recipeData) {
    // add it to db
    try {
      const newRecipe = await Recipe.create({
        ...req.body,
      });
      const newFavorite = await Favorite.create({
        user_id: req.session.user_id,
        recipe_id: newRecipe.id
      });

      res.status(200).json(newFavorite);

    } catch (err) {
      res.status(400).json(err);
    }
  }
  else {
    try {
      const newFavorite = await Favorite.create({
        user_id: req.session.user_id,
        recipe_id: recipe.dataValues.id
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
// Below gets all Recipes with associated username
/*
router.get("/", async (req, res) => {
  try {
    const postData = await Recipe.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//This gets one  by Id w/ asociated username and comments
router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
    });
    if (!postData) {
      res.status(404).json({ message: "No recipe found with that id!" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});



// This updates an existing  with authenticated user
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updatedPost) {
      res.status(404).json({ message: "No recipe found with that id!" });
      return;
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//This deletes a recipe with autho user
router.delete("/:id", withAuth, async (req, res) => {
  try {
    // Delete all comments related to the recipe
    await Comment.destroy({
      where: { post_id: req.params.id },
    });

    const deletedPost = await Post.destroy({
      where: { id: req.params.id },
    });

    if (!deletedPost) {
      res.status(404).json({ message: "No recipe found with that id!" });
      return;
    }
    res.status(200).json(deletedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});
*/
module.exports = router;