const router = require("express").Router();
const { Comment } = require("../../models/");
const authorize = require("../../utils/authorize");

router.post("/", authorize, async (req, res) => {
  try {
    const comment = await Comment.create({
      ...req.body,
      userID: req.session.userID,
    });
    res.json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
