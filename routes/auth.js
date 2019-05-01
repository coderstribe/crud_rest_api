var express = require('express');
var router = express.Router();
var user= require('../db/user');
/* GET home page. */


module.exports = function(passport){

    router.post('/signup', function(req, res) {
        var body=req.body;
        username=body.username;
        password=body.password;
        user.findOne({username:username},function(err,doc){
            if(err)
            {
            res.status(500).send('Error Occurred')}
            else {
                if(doc){
                    res.status(500).send('User Already Exists')
                }
                else{
                    var record = new user()
                    record.username=username;
                    record.password=record.hashPassword(password)
                    record.save(function(err,user){
                        if(err){
                            res.status(500).send('Error in DB')
                        }
                        else{
                            res.redirect('/auth/read');
                        }

                    })
                }
            }
        })
      }); 


      router.get('/read', function(req, res, next) {

        user.find().sort('username').exec(function(error, results) {
        if (error) {
        return next(error);
        }
        // Respond with valid data
        res.json(results);
        });
        });

    router.post('/update', function(req, res, next) {
            
            console.log(req.body.username);
            user.findOneAndUpdate({_id:req.body._id},{username:req.body.username},function(error, results) {
            if (error) {
            return next(error);
            }
            // Respond with valid data
            res.redirect('/auth/read');
            });
      });


    router.post('/delete', function(req, res, next) {
    username=req.body.username;
    user.deleteOne({username:username},function(error, results) {
        if (error) {
        return next(error);
        }
    // Respond with valid data
        res.redirect('/auth/read');
    });
});
            
    function requireAdmin() {
        return function(req, res, next) {
            var name = req.body.username
          user.findOne({ username: name }, function(err, user) {
            if (err) { return next(err); }
      
            if (!user) { 
                res.send('User doesnot exist');
            }
      
           
            // Hand over control to passport
            next();
          });
        }
      }


      router.post('/login',requireAdmin(), passport.authenticate('local'),function(req,res){
        if(req.body.username=="admin"){
            res.render('curd');
        }else{
            res.redirect('/profile');
        }
      });
return router;



} ;



// username = "admin";
//             if(req.body.username === username){
//                 passport.authenticate('local', { successRedirect: '/curd_admin',failureRedirect:'/login' })
//             }else if(req.body.username!==username){
//                 passport.authenticate('local', { successRedirect: '/profile',failureRedirect:'/login' })
//             }