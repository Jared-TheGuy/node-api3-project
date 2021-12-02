const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();
const { validateUserId, validateUser } = require('../middleware/middleware');

const Users = require('./users-model');
const Posts = require('../posts/posts-model')

router.get('/', async(req, res) => {
  try {
    const users = await Users.get();
    res.json(users)
  }
  catch (err) {
    res.status(500).json({
      message: "You lose"
    })
  }
});

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user);
});

router.post('/', validateUser,  async (req, res) => {
  try {
    const user = await Users.insert(req.body)
    res.status(201).json(user)
  }
  catch (err) {
    res.status(500).json({
      message: "You lose"
    })
  }
});

router.put('/:id', validateUser, validateUserId, async (req, res) => {
  try {
    const user = await Users.update(req.user.id, req.body)
    res.json(user)
  }
  catch (err) {
    res.status(500).json({
      message: "You lose"
    })
  }
});

router.delete('/:id', validateUserId, async (req, res) => {
  try { 
    const deleted = await Users.remove( req.user.id)
    res.json(deleted)
  }
  catch (err) {
    res.status(500).json({
      message: "You lose"
    })
  }
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

module.exports = router;
