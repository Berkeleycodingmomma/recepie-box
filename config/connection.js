const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

// Check if JAWSDB_URL environment variable is present (indicating a Heroku deployment)
if (process.env.JAWSDB_URL) {
  // Create a Sequelize instance using the JAWSDB_URL
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // Create a Sequelize instance for local development
  sequelize = new Sequelize(
    process.env.DB_NAME, // Database name
    process.env.DB_USER, // Database username
    process.env.DB_PASSWORD, // Database password
    {
      host: 'localhost', // Database host
      dialect: 'mysql', // Database dialect (in this case, MySQL)
      port: 3306, // Database port
    }
  );
}

module.exports = sequelize;