const User = require('./user');
const Blogpost = require('./blogpost');
const Comment = require('./comment');

Blogpost.belongsTo(User, {
  foreignKey: 'userID',
  onDelete: 'CASCADE'
});

User.hasMany(Blogpost, {
   foreignKey: 'userID',
});

User.hasMany(Comment, {
   foreignKey: 'userID',
});

Comment.belongsTo(User, {
   foreignKey: 'userID',
   onDelete: 'CASCADE'
});

Blogpost.hasMany(Comment, {
  foreignKey: 'postID',
});

Comment.belongsTo(Blogpost, {
   foreignKey: 'postID',
   onDelete: 'CASCADE'
});

module.exports = {User, Comment, Blogpost};