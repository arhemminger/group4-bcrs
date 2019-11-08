/*
=====================================
  ; Title: app.js
  ; Authors: William Thomason
  ;          Griselda Balmaceda
  ;          Andrew Hemminger
  ; Date: October 21 2019
  ; Description: app.js
======================================
*/
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./db-models/users');
const SecurityQuestion = require('./db-models/securityQuestions');
const Roles = require('./db-models/roles');
const Orders = require('./db-models/orders');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../dist/bcrs')));
app.use('/', express.static(path.join(__dirname, '../dist/bcrs')));

// Global variables
const serverPort = 3000;
const saltRounds = 10; //default salt rounds for hashing algorithm

//Use this function to Hash the passwords.
function hashPassword(password){

  return bcrypt.hashSync(password, saltRounds);

}

/************************* Mongoose connection strings go below this line  ***************/

// MongoDB (Atlas) connection string
const connString = 'mongodb+srv://admin:bu12345@bcrs-waeqk.mongodb.net/bcrs?retryWrites=true&w=majority'

// MongoDB connect
mongoose.connect(connString, {promiseLibrary: require('bluebird'), useNewUrlParser: true})
        .then(() => console.debug('Connection to the MongoDB instance was successful'))
        .catch((err) => console.debug('MongoDB Error: ' + err.message));

/************************* API routes go below this line ********************/

/****************************USER API*******************************  */

/**
 * Create/Register New user
 */
app.post('/api/users/register', function(req, res, next){

  //Check to see if userName is already in use.
  User.findOne({'userName': req.body.userName}, function(err, user){
    if (err) {
      console.log(err);
      return next(err);
    }
    else{
      if(user){
        res.status(500).send({
          text: 'The selected userName: ' + req.body.userName + ' is already in use',
          time_stamp: new Date()
        });
      }
      if(!user){

        //Check to see if email is already in use.
        User.findOne({'email': req.body.email}, function(err, user1){
          if (err) {
            console.log(err);
            return next(err);
          }
          else{
            if(user1){
              res.status(500).send({
                text: 'The selected email: ' + req.body.email + ' is already in use',
                time_stamp: new Date()
              });
            }
            if(!user1){
              //The selected email is unique
              let hashedPassword = hashPassword(req.body.password); //Hashing the password before it goes into the DB

              //This creates a addUser object to insert into DB
              let addUser = {
                userName: req.body.userName,
                password: hashedPassword,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                role: req.body.role,
                dateCreated: new Date(),
                dateModified: new Date(),
                selectedSecurityQuestions: req.body.questions
                /*
                  * the req.body.selectedSecurityQuestions is an array sent from the Angular UI
                  * the questionId needs to be the _id that mongoDB generates
                  * the bellow example needs to be done on client
                  * Example:
                  * let questions = [
                  * {questionId: '1234', answerText: 'Blue'},
                  * {questionId: '5678', answerText: 'Red'},
                  * {questionId: '9012', answerText: 'White'}
                  * ]
                  */

              }//end of user object

              User.create(addUser, function(err, newUser){
                if(err){
                  console.log('The bellow error is associated with the User.create inside the register API Route')
                  console.log(err);
                  return next(err);
                }
                else{
                  console.log('User registered');
                  console.log(newUser);
                  res.json(newUser);
                }
              })//End of user create

              }//end of email else
            };//end of check email
          });//end of fineOne
        }//end of user if(!user)
      }//end of else
      });//end of username findOne
  });//end of post


/**
 * Update user by _id
 */
app.put('/api/users/update/:id', function(req, res, next){

   User.findOne({'_id': req.params.id}, function(err, user){
     if(err){
       console.log("ERROR inside the user update by ID");
       console.log(err);
       return next(err);
     }
     else{
       console.log(user);
       user.set({
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         phone: req.body.phone,
         address: req.body.address,
         role: req.body.role,
         dateModified: new Date()
       })

       user.save(function(err, savedUser){
         if(err){
          console.log("ERROR inside the user.save of the update user API Route");
          console.log(err);
          return next(err);
         }
         else{
           console.log("User was updated");
           console.log(savedUser);
           res.json(savedUser);
         }
       })
     }
   })

});

/*
*   Get all users
*/
app.get('/api/users/all', function(req, res, next) {
  User.find(function(err, users) {
    if (err) {
      console.log(err);
      return next(err);
    }  else {
      console.log(users);
      res.json(users);
    }
  })
});

/*
*  Get User by email
*  Pass the password so we can hash it and check against password returned from the DB
*/
app.post('/api/users/login', function(req, res, next) {
  //console.log(req.body.email);
  //console.log(req.body.password);

  User.findOne({'email': req.body.email}, function(err, foundUser) {
    //console.log("inside findOne!!!!!")
    //console.log("Password found: " + foundUser.password);
    if( bcrypt.compare(req.body.password, foundUser.password)) {
      //console.log(foundUser);
      res.json(foundUser);
    }
    else{
      console.log("Password didn't match!");
      res.status(500).send({
        text: 'You have entered an incorrect password. Please try again!',
        time_stamp: new Date()
      });
    }
})
})

/**
 * Delete User by id
 */
app.delete('/api/users/delete/:id', function(req, res, next){
  User.findByIdAndDelete({'_id': req.params.id}, function(err, deletedUser){
    console.log(deletedUser);
    if(err){
      console.log(err);
      return next(err);
    }
    else{
      console.log(deletedUser);
      res.json(deletedUser);
    }
  })
});

/***************************ROLEGUARD API*******************/

// get user by _Id
app.get('/api/user/:id', function(req, res, next) {
  User.findOne({'id': req.body._id},function(err, user) {
    if (err) {
      console.log(err);
      return next(err);
    }  else {
      console.log(user.role);
      res.json(user.role);
    }
  })
});


/***************************SECURITY QUESTION API*******************/
//Create Security Question
app.post('/api/questions', function(req, res, next) {
  const addedQuestion = {
    questionText: req.body.questionText,
  };
  SecurityQuestion.create(addedQuestion, function(err, newQuestion) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(newQuestion);
      res.json(newQuestion);
    }
  });
});

//Get all Questions
app.get('/api/questions/all', function(req, res, next) {
  SecurityQuestion.find(function(err, securityQuestion) {
    if (err) {
      console.log(err);
      return next(err);
    }  else {
      console.log(securityQuestion);
      res.json(securityQuestion);
    }
  })
});

//Delete Security Question by id
app.delete('/api/questions/delete/:id', function(req, res, next){
  SecurityQuestion.findByIdAndDelete({'_id': req.params.id}, function(err, securityQuestion){
    if(err){
      console.log(err);
      return next(err);
    }
    else{
      console.log(securityQuestion);
      res.json(securityQuestion);
    }
  })
});

//update security question by id
app.put('/api/questions/update/:id', function(req, res, next){

  SecurityQuestion.findOne({'_id': req.params.id}, function(err, question){
    console.log(question)
    if(err){
      console.log("ERROR inside the questionText update by ID");
      console.log(err);
      return next(err);
    }
    else{

      question.set({
        questionText: req.body.questionText,
      })

      question.save(function(err, savedQuestion){
        if(err){
         console.log("ERROR inside the Question.save of the update Question API Route");
         console.log(err);
         return next(err);
        }
        else{
          console.log("question was updated");
          console.log(savedQuestion);
          res.json(savedQuestion);
        }
      })
    }
  })

});

/***************************FORGOT PASSWORD APIs*******************/
// verify user email
app.get('/api/verify/email/:email', function(req, res, next) {
  User.findOne({'email': req.params.email}, function(err, email) {
    if (err) {
      console.log(err);
      return next(err);
    }  else {
      console.log(email);
      res.json(email);
    }
  })
});

// return user selected security questions
app.get('/api/users/selectedSecurityQuestions/:email', function(req, res, next) {
  User.findOne({'email': req.params.email}, function(err, questions) {
    if (err) {
      console.log(err);
      return next(err);
    }  else {
      res.json(questions.selectedSecurityQuestions);
    }
  })
});

// verify user security question answers
app.post('/api/users/verify/securityQuestions/:email', function(req, res, next) {
  const answerToSecurityQuestion1 = req.body.answerToSecurityQuestion1;
  console.log(answerToSecurityQuestion1);

  const answerToSecurityQuestion2 = req.body.answerToSecurityQuestion2;
  console.log(answerToSecurityQuestion2);

  const answerToSecurityQuestion3 = req.body.answerToSecurityQuestion3;
  console.log(answerToSecurityQuestion3);

  User.findOne({'email': req.params.email}, function (err, users) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(users); //need to comment this log out for production deploy

      let answer1IsValid = answerToSecurityQuestion1 === users.selectedSecurityQuestions[0].answerText;
      console.log(answer1IsValid);

      let answer2IsValid = answerToSecurityQuestion2 === users.selectedSecurityQuestions[1].answerText;
      console.log(answer2IsValid);

      let answer3IsValid = answerToSecurityQuestion3 === users.selectedSecurityQuestions[2].answerText;
      console.log(answer3IsValid);

      if (answer1IsValid && answer2IsValid && answer3IsValid) {
        res.status(200).send({
          type: 'success',
          auth: true
        })
      } else {
        res.status(200).send({
          type: 'error',
          auth: false
        })
      }
    }
  })
});

// reset user password
app.post('/api/users/reset-password/:email', function(req, res, next) {
  const password = req.body.password;

  User.findOne({'email': req.params.email}, function(err, user) {
    if(err) {
      console.log(err);
      return next(err);
    } else {
      console.log(user);

      let hashedPassword = bcrypt.hashSync(password, saltRounds);

      user.set({
        password: hashedPassword
      });

      user.save(function (err, user) {
        if(err) {
          console.log(err);
          return next(err);
        } else {
          console.log(user);
          res.json(user);
        }
      })
    }
  })
});

/***************************ROLE MANAGEMENT APIs*******************/
//Create Role
app.post('/api/create/role', function(req, res, next) {
  const addedRole = {
    role: req.body.role,
    isAdmin: req.body.isAdmin
  };
  Roles.create(addedRole, function(err, newRole) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(newRole);
      res.json(newRole);
    }
  });
});

//Get all Roles
app.get('/api/roles/all', function(req, res, next) {
  Roles.find(function(err, roles) {
    if (err) {
      console.log(err);
      return next(err);
    }  else {
      console.log(roles);
      res.json(roles);
    }
  })
});

//Delete Role by _id
app.delete('/api/delete/role/:id', function(req, res, next){
  Roles.findByIdAndDelete({'_id': req.params.id}, function(err, role){
    if(err){
      console.log(err);
      return next(err);
    }
    else{
      console.log(role + ' deleted');
      res.json(role);
    }
  })
});

//Update Role by _id
app.put('/api/update/role/:id', function(req, res, next){

  Roles.findOne({'_id': req.params.id}, function(err, role){
    console.log(role);
    if(err){
      console.log("ERROR inside the role update by _id");
      console.log(err);
      return next(err);
    }
    else{
      role.set({
        role: req.body.role,
        isAdmin: req.body.isAdmin
      })

      role.save(function(err, savedRole){
        if(err){
         console.log("ERROR inside the Role.save of the update Role API");
         console.log(err);
         return next(err);
        }
        else{
          console.log("Role was updated");
          console.log(savedRole);
          res.json(savedRole);
        }
      })
    }
  })
});




/************************* ORDERS API ROUTES *************************************/

//CREATE ORDER
app.post('/api/orders', function(req, res, next) {
  const addedOrder = {
    userId: req.body.userId,
    total: req.body.total,
    productsOrdered: req.body.productsOrdered

    /*
      * the req.body.productsOrdered is an array sent from the Angular UI
      * the userId needs to be the _id that mongoDB generates
      * the bellow example needs to be done on client
      * Example:
      * let products = [
      * {productName: 'Keyboard', productRepairTime: 3, quantity: 3, productPrice: '1234'},
      * {productName: 'Mouse', productRepairTime: 3, quantity: 3, productPrice: '1234'},
      * {productName: 'Repair', productRepairTime: 3, quantity: 3, productPrice: '1234'}
       * ]
    */
  };
  Orders.create(addedOrder, function(err, newOrder) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(newOrder);
      res.json(newOrder);
    }
  });
});


//GET ALL ORDERS
app.get('/api/orders/all', function(req, res, next) {
  Orders.find(function(err, orders) {
    if (err) {
      console.log(err);
      return next(err);
    }  else {
      console.log(orders);
      res.json(orders);
    }
  })
});


//GET ORDER BY ID
app.get('/api/orders/:id', function(req, res, next) {
  Quiz.findOne({'_id': req.params.id}, function(err, order) {
    if (err) {
      console.log(err);
      return next(err);
    }  else {
      console.log(order);
      res.json(order);
    }
  })
});

/***************************SERVER*******************/
/**
 * Creates an express server and listens on port 3000
 */
http.createServer(app).listen(serverPort, function() {
  console.log(`Application started and listing on port: ${serverPort}`);
});
