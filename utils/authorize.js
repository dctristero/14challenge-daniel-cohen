const authorize = (req, res, next) => {
   if (!req.session.logged_in) {
     res.status(400);
   } else {
     next();
   }
 };
 
 module.exports = authorize;
 