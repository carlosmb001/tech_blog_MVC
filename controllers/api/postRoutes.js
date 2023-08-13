const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

//create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      username: req.session.username,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});
//will update a post
router.put('/:id', withAuth, async (req, res) => {
    try {
      const updatedPost = await Post.update(
        { ...req.body },
        {
          where: {
            id: req.params.id,
            username: req.session.username,
          },
        }
      );
  
      if (updatedPost[0] === 0) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
  
      res.status(200).json({ message: 'Post updated successfully' });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  //delete a post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        username: req.session.username,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
