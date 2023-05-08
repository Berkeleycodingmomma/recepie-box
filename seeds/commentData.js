const { Comment } = require("../models");

const CommentData = [
    
    {
        comment_text: "Great article!",
        user_id: 1,
        recipe_id: 1,
    },
    {
        comment_text: "I agree with you!",
        user_id: 2,
        recipe_id: 1,
    },
    {
        comment_text: "I disagree with you",
        user_id: 3,
        recipe_id: 1,
    },
    {
        comment_text: "I agree with you",
        user_id: 4,
        recipe_id: 1,
    },
    {
        comment_text: "I disagree with you!",
        user_id: 5,
        recipe_id: 1,
    },  {
        comment_text: "Great article",
        user_id: 1,
        recipe_id: 2,
    },
    {
        comment_text: "I agree with you!",
        user_id: 2,
        _id: 2,
    },
];

const seedComments = () => Comment.bulkCreate(commentData);
module.exports = seedComments;