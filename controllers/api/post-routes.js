const router = require("express").Router();
const { Blogpost } = require("../../models");
const authorize = require("../../utils/authorize");

router.post("/", authorize, async (req, res) => {
   try {
     const post = await Blogpost.create({
       ...req.body,
       userID: req.session.user_id
     });
     res.status(200).json(post);
   } catch (err) {
     res.status(400).json(err);
   }
});

router.put('/:id', authorize, (req, res) => {
   // update a category by its `id` value
   try { const updated = Blogpost.update({
         ...req.body,
         userID: req.session.user_id
      }, 
      {
         where: {
      id: req.params.id},
   });
   if (!updated) {
      res.status(404).json({
        message: `Why would you try to destroy something that doesn't exist; that doesn't even make any sense, what are you doing`,
      });
      return;
    }
    res.status(200).json(updated);
} catch (err) {
   res.status(500).json(err);
 }
});

router.delete("/:id", authorize, async (req, res) => {
   try {
     const baleeted = await Blogpost.destroy({
       where: {
         id: req.params.id,
       },
     });
     if (!baleeted) {
       res.status(404).json({
         message: `Why would you try to destroy something that doesn't exist; that doesn't even make any sense, what are you doing`,
       });
       return;
     }
     res.status(200).json(baleeted);
   } catch (err) {
     res.status(500).json(err);
   }
});

module.exports = router;