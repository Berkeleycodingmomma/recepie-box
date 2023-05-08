// Below I am importing the required modules
const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

//This creates a new comment
router.post("/", withAuth, async (req, res) => {
  try {    
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    // Sends a response with the new comment data
    res.status(200).json(newComment);
  } catch (err) {
    // Sendd an error response if something went wrong
    res.status(400).json(err);
  }
});

module.exports = router;