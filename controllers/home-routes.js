const router = require("express").Router();
const { User, Blogpost, Comment } = require("../models");

router.get("/", async (req, res) => {
  try {
    const blogPosts = await Blogpost.findAll({
      include: [User],
    });
    const everyPost = blogPosts.map((bp) => bp.get({ plain: true }));
    res.render("reader-home", { 
      layout: "main",
      everyPost });
  } catch (err) {
   console.log(err);
    res.status(500).json(err);
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const bpData = await Blogpost.findByPk(req.params.id, {
      include: [
         {
            model: User
         },
         {
            model: Comment
         }
      ],
    });
    const blogPost = bpData.get({ plain: true });
    console.log(blogPost)
   res.render("one-post", { 
      layout: "main",
      blogPost });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

// route for reviewing all users - not accessible through user interface
router.get("/list", async (req, res) => {
  const userData = await User.findAll().catch((err) => {
    res.json(err);
  });
  const users = userData.map((user) => user.get({ plain: true }));

  res.json(users);
});

// route for reviewing all games OR SOMETHING - not accessible through user interface
// router.get("/box", async (req, res) => {
//   const gameData = await Game.findAll().catch((err) => {
//     res.json(err);
//   });
//   const games = gameData.map((game) => game.get({ plain: true }));

//   res.json(games);
// });

router.get('/signup', (req, res) => {
   res.render('signup');
});


module.exports = router;
