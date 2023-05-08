
//Below importing the seed data functions 
const seedUsers = require("./userData");
const seedRecipes = require("./recipeData");
const seedComments = require("./commentData");

const sequelize = require('../config/connection');

const seedAll  = async () => {

await sequelize.sync({ force: true });

// Calling each of the seed data functions
await seedUsers();
await seedRecipes();
await seedComments();

// Exiting the process with a successful exit code
process.exit(0);
};

// Calling the seedAll function to seed the database
seedAll();
