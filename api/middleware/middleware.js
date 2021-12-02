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
      res.status(404).json({ message: "user not found" })
    }
  }
  catch (err)  {
    res.status(500).json({
      message: "You"
    })
  }
  }
  

function validateUser(req, res, next) {
  if (req.body.name) {
    next()
  }
  else {
    res.status(400).json({ message: "missing required name field" })
  }

}

function validatePost(req, res, next) {
  const { text } = req.body  
  if(!text || !text.trim()){
    res.status(400).json({
      message: 'missing required text field'
    })
  }else{
    req.text = text.trim()
    next()
  }
  
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}