const router = require("express").Router();
const { User, Blogpost, Comment } = require("../models");
const authorize = require("../utils/authorize");

router.get("/user-home", authorize, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Blogpost }],
    });
    const user = userData.get({ plain: true });
    res.render("user-home", {
      layout: "dashboard",
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/write-post", authorize, (req, res) => {
  res.render("write-post", {
    layout: "dashboard",
  });
});

router.get("/edit-post/:id", authorize, async (req, res) => {
  try {
    const postData = await Blogpost.findByPk(req.params.id);


      const blogPost = postData.get({ plain: true });

      res.render("edit-post", {
        layout: "dashboard",
        blogPost,
      });
  } catch (err) {
    res.redirect("login");
  }
});

module.exports = router;