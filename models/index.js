const User = require('./user');
const Blogpost = require('./blogpost');
const Comment = require('./comment');

Blogpost.belongsTo(User, {
  foreignKey: 'userID',
  onDelete: 'CASCADE'
});

User.hasMany(Blogpost, {
   foreignKey: 'userID',
   onDelete: 'CASCADE'
});

User.hasMany(Comment, {
   foreignKey: 'userID',
   onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
   foreignKey: 'userID',
   onDelete: 'CASCADE'
});

Blogpost.hasMany(Comment, {
  foreignKey: 'postID',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Blogpost, {
   foreignKey: 'postID',
   onDelete: 'CASCADE'
});

module.exports = {User, Comment, Blogpost};