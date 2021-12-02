const Users = require('../users/users-model');
const Posts = require('../posts/posts-model');

function logger(req, res, next) {
  
  console.log(
    req.method,
    req.url,
    Date.now() 
    );
  
  next();
}

async function validateUserId(req, res, next) {
  try {
    const user = await Users.getById(req.params.id)
    if (user) {
      req.user = user;
      next();
    }
    else {
      res.status(500).json({
        message: "You failed validateUserId"
      })
    }
  }
  catch (err)  {
    res.status(500).json({
      message: "You failed validateUserId"
    })
  }
  }
  

function validateUser(req, res, next) {
  if (req.body.name) {
    next()
  }
  else {
    res.status(500).json({
      message: "You failed validateUser"
    })
  }

}

function validatePost(req, res, next) {
  
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
}