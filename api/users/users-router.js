const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();
const { validateUserId } = require('../middleware/middleware');

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

router.post('/', async (req, res) => {
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

router.put('/:id', (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
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
