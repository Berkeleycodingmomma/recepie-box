Constrouter = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Below gets all Recipes with associated username
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
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

  //This creates a new recipe with auth user
  router.post("/", withAuth, async (req, res) => {
    try {
      const newPost = await Post.create({
        ...req.body,
        user_id: req.session.user_id,
      });
      res.status(200).json(newPost);
    } catch (err) {
      res.status(400).json(err);
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
  
  module.exports = router;