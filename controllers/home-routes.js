//Below I am importing necessary packages and models
const router = require("express").Router();
const {
    Post,
    User,
    Comment
} = require("../models");
const withAuth = require("../utils/auth");

// Route to render homepage
router.get("/", async (req, res) => {
    try {
        // Find all posts with associated usernames
        const postData = await Post.findAll({
            include: [{
                model: User,
                attributes: ["username"]
            }],
        });
        // Convert post data to plain JavaScript object
        const posts = postData.map((post) => post.get({
            plain: true
        }));
        // Render homepage template with posts and login status
        res.render("homepage", {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to render individual post page
router.get("/post/:id", withAuth, async (req, res) => {
    try {
        // Find post by ID with associated username and comments with associated usernames
        const postData = await Post.findByPk(req.params.id, {
            include: [{
                    model: User,
                    attributes: ["username"]
                },
                {
                    model: Comment,
                    include: [{
                        model: User,
                        attributes: ["username"]
                    }],
                },
            ],
        });
        // Convert post data to plain JavaScript object and render post templates with post data and login status
        const post = postData.get({
            plain: true
        });
        res.render("post", {
            ...post,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to render dashboard page with all posts by current user then finding all posts by current user with associated usernames
router.get("/dashboard", withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [{
                model: User,
                attributes: ["username"]
            }],
        });
        // Convert post data to plain JavaScript object
        const posts = postData.map((post) => post.get({
            plain: true
        }));

        res.render("dashboard", {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/dashboard");
        return;
    }
    res.render("login");
});
router.get("/signup", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/dashboard");
        return;
    }
    res.render("signup");
});
//render the new post page
router.get("/newpost", (req, res) => {
    if (req.session.logged_in) {
        res.render("newpost");
        return;
    }
    res.redirect("/login");
});


//render the edit post page
router.get("/editpost/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{
                    model: User,
                    attributes: ["username"]
                },
                {
                    model: Comment,
                    include: [{
                        model: User,
                        attributes: ["username"]
                    }],
                },
            ],
        });

        const post = postData.get({
            plain: true
        });

        res.render("editpost", {
            ...post,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});
// module exports router
module.exports = router;