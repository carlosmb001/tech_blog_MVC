const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// get all posts
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        id: req.params.id,
      }, include: [{ all: true, nested: true }],
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ all: true, nested: true }],
    });
    res.status(200).json(posts);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }

});

//create a new post
//http:/localhost:3001/api/post/
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
      {...req.body, user_id: req.session.user_id},
      {
        where: {
          id: req.params.id,
          username: req.session.username,
        },
      }
    );

    if (updatedPost === 0) {
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
    const delData = await Post.destroy({
      where: {
        id: req.params.id,
        username: req.session.username,
      },
    });

    if (!delData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(delData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
