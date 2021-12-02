const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware');

const Users = require('./users-model');
const Posts = require('../posts/posts-model')

router.get('/', async(req, res, next) => {
  try {
    const users = await Users.get();
    res.json(users)
  }
  catch (err){
    next(err)
  }
});

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user);
});

router.post('/', validateUser,  async (req, res, next) => {
  try {
    const user = await Users.insert(req.body)
    res.status(201).json(user)
  }
  catch (err){
    next(err)
  }
});

router.put('/:id', validateUser, validateUserId, async (req, res, next) => {
  try {
    const user = await Users.update(req.user.id, req.body)
    res.json(user)
  }
  catch (err){
    next(err)
  }
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  try { 
    const deleted = await Users.remove( req.user.id)
    res.json(req.user)
  }
  catch (err){
    next(err)
  }
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  try {
    const posts = await Users.getUserPosts(req.params.id)
    res.json(posts)
  }
  catch (err){
    next(err)
  }
  
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
  try{
    const result = await Posts.insert({
      user_id: req.params.id,
      text: req.text,
    })
    res.status(201).json(result)
  }catch (err){
    next(err)
  }
  });

  router.use((err, req, res, next)=>{
    res.status(err.status || 500).json({
      errorMessage: ' Something went wrong!',
      message: err.message,
      stack: err.stack,
    })
  })

module.exports = router;
