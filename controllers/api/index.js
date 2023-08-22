const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes.js');

//http;//localhost:3001/api/user
router.use('/user', userRoutes);
//http://localhost:3001/api/post
router.use('/post', postRoutes);

module.exports = router;
