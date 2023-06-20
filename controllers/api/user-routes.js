const router = require("express").Router();
const { User } = require("../../models");

router.post("/", async (req, res) => {
   try {
     const userData = await User.create(req.body);
     req.session.save(() => {
       req.session.user_id = userData.id;
       req.session.logged_in = true;
       res.status(200).json(userData);
     });
   } catch (err) {
     res.status(400).json(err);
   }
 });

 router.post("/login", async (req, res) => {
   try {
     const userData = await User.findOne({ where: { username: req.body.username } });
     if (!userData) {
       res
         .status(400)
         .json({ alert: `I'M AFRAID I CAN'T ACCEPT THAT INPUT, DAVE` });
       return;
     }
     const goodPassword = await userData.checkPassword(req.body.password);
     if (!goodPassword) {
       res
         .status(400)
         .json({ message: `I'M AFRAID I CAN'T ACCEPT THAT INPUT, DAVE` });
       return;
     }
     req.session.save(() => {
       req.session.user_id = userData.id;
       req.session.logged_in = true;
       res.json({ user: userData, message: "YES! YES! YES!" });
     });
   } catch (err) {
     res.status(400).json(err);
   }
 });

 router.post("/logout", (req, res) => {
   if (req.session.logged_in) {
     req.session.destroy(() => {
       res.status(204).end();
     });
   } else {
     res.status(404).end();
   }
 });

 module.exports = router;