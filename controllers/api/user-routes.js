const router = require("express").Router();
const { User } = require("../../models");

//route to sign up new user
router.post("/signup", async (req, res) => {
  try {
    // Create a new User instance
    const newUser = new User();
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.password = req.body.password;

    // Save the new user data
    const userData = await newUser.save();
    // Save the user session and set session variables
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      // Return a 200 status code with the user data
      res.status(200).json(userData);
    });
  } catch (err) {
    // If an error occurs during signup, return a 400 status code with the error
    res.status(400).json(err);
    console.log(err);
  }
});

//  route to log in a user
router.post("/login", async (req, res) => {
  try {
    // Find the user data based on the provided username
    const userData = await User.findOne({ where: { username: req.body.username } });
    // Check if user data exists
    if (!userData) {
      // If user data doesn't exist, return a 400 status code with an error message
      res
        .status(400)
        .json({ message: "Incorrect username or password, please try again" });
      return;
    }
    // Check if the provided password is valid
    const validPassword = await userData.checkPassword(req.body.password);
    // Check if the password is valid
    if (!validPassword) {
      // If the password is not valid, return a 400 status code with an error message
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // Save the user session and set session variables
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      // Return a 200 status code with the user data and a success message
      res
        .status(200)
        .json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    // If an error occurs during login, return a 400 status code with the error
    res.status(400).json(err);
  }
});

//route to log out a user
router.post("/logout", (req, res) => {
  // Check if the user is logged in
  if (req.session.logged_in) {
    // Destroy the session to log out the user
    req.session.destroy(() => {
      // Return a 204 status code to indicate successful logout
      res.status(204).end();
    });
  } else {
    // If the user is not logged in, return a 404 status code 
    res.status(404).end();
  }
});

module.exports = router;
