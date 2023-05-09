// Importing the required modules
const router = require("express").Router();
const userRoutes = require("./user-routes");
const postRoutes = require("./post-routes");

// Setting up the routes
router.use("/users", userRoutes);
router.use("/posts", postRoutes);

module.exports = router;