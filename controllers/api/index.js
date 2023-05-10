// Importing the required modules
const router = require("express").Router();
const userRoutes = require("./user-routes");
const recipeRoutes = require("./recipe-routes");

// Setting up the routes
router.use("/users", userRoutes);
router.use("/recipes", recipeRoutes);

module.exports = router;