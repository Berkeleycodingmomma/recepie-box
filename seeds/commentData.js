const { Comment } = require("../models");

const CommentData = [
    
    {
        comment_text: "Great article!",
        user_id: 1,
        post_id: 1,
    },
    {
        comment_text: "I agree with you!",
        user_id: 2,
        post_id: 1,
    },
    {
        comment_text: "I disagree with you",
        user_id: 3,
        post_id: 1,
    },
    {
        comment_text: "I agree with you",
        user_id: 4,
        post_id: 1,
    },
    {
        comment_text: "I disagree with you!",
        user_id: 5,
        post_id: 1,
    },  {
        comment_text: "Great article",
        user_id: 1,
        post_id: 2,
    },
    {
        comment_text: "I agree with you!",
        user_id: 2,
        post_id: 2,
    },
];

const seedComments = () => Comment.bulkCreate(commentData);
module.exports = seedComments;