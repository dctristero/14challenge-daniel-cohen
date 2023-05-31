const User = require('./user');
const Blogpost = require('./blogpost');
const Comment = require('./comment');

Blogpost.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

User.hasMany(Blogpost, {
   foreignKey: 'userId',
   onDelete: 'CASCADE'
});

User.hasMany(Comment, {
   foreignKey: 'userId',
   onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
   foreignKey: 'userId',
   onDelete: 'CASCADE'
});

Blogpost.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Blogpost, {
   foreignKey: 'postId',
   onDelete: 'CASCADE'
});

module.exports = {User, Comment, Blogpost};