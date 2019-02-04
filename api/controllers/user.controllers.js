var mongoose= require('mongoose');
var User= mongoose.model('user');
var bcrypt   = require('bcrypt-nodejs');
var jwt      = require('jsonwebtoken');

module.exports.Signup = function(req, res) 

{
  
  console.log('Registering User');

  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;

  User.create({

    username: username,
    email: email,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))

  }, function(err, user) 

  {

    if (err) 

    {
      console.log(err);
      res.status(400).json(err);

    } 

    else 

    {
      console.log('User created', user);
      res.status(201).json(user);  

    }

  });

};

  module.exports.login = function(req, res) 

  {

    console.log('User Login');
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({
      username: username
    }).exec(function(err, user) 

    {
      if (err) 

      {


        console.log(err);
        res.status(400).json(err);

      } 

      else 

      {
        
        if (bcrypt.compareSync(password, user.password)) 

        {
          
            console.log('User found', user);
            var token = jwt.sign({ username: user.username }, 'targus', { expiresIn: 3600 });
            res.status(200).json({success: true, token: token});

        } 

        else

         {

            res.status(401).json('Unauthorized');

         }

      }

  });

};

module.exports.authenticate = function(req, res, next) 

{

  var headerExists = req.headers.authorization;
  
  if (headerExists) 

  {
    
    var token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'targus', function(error, decoded) 

    {
      
      if (error) 

      {
        
        console.log(error);
        res.status(401).json('Unauthorized');
      
      } 

      else 

      {

        req.user = decoded.username;
        next();
      
      }
    
    });
  
  } 

  else 

  {

    res.status(403).json('No token provided');
  
  }

};

module.exports.Update_Pass=function(req,res,next)

{
   
    User.updateOne({"email" : req.body.email},

    { $set: { "password" : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))}},

     function(err, success)

     {
             
       if(err) throw err;

       else
      
       {
          res
          .status(200)
          .json(success);

       }    

     });
         
};

