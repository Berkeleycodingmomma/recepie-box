// Below I am importing the necessary models
const User = require("./User");
const Post = require("./Recipe");
const Comment = require("./Comment");

// Below I am the relationships between the models
User.hasMany(Post, {
    foreignKey: "user_id", // foreign key relationship
  });
  
  Post.belongsTo(User, {
    foreignKey: "user_id", // foreign key relationship
  });
  
  Comment.belongsTo(User, {
    foreignKey: "user_id", //foreign key relationship
  });
  
  Comment.belongsTo(Post, {
    foreignKey: "post_id", // foreign key relationship
  });
  
  Post.hasMany(Comment, {
    foreignKey: "post_id", //foreign key relationship
  });
  
  User.hasMany(Comment, {
    foreignKey: "user_id", // foreign key relationship
  });
 
  module.exports = { User, Post, Comment };
  