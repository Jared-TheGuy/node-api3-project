const express = require('express');

const server = express();
const router = require('./users/users-router');



// remember express by default cannot parse JSON in request bodies
server.use(express.json());

//logger
server.use((req, res, next) => {

  console.log(
    req.method,
    req.url,
    Date.now() 
    );
  
  next();
})

server.use('/api/users', router)

// global middlewares and the user's router need to be connected here

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
