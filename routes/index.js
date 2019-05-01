var express = require('express');
var router = express.Router();
var loggedin = function(req,res,next)
{
  if(req.isAuthenticated()){
    next()
      }
      else{
        res.redirect('/login')
      }
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Weclome' });
});
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.get('/update',loggedin, function(req, res, next) {
  sess=req.session;
  res.render('update');
  res.send(sess);
});


router.get('/delete',loggedin, function(req, res, next) {
  sess=req.session;
  res.render('delete');
  res.send(sess);
});


router.get('/profile',loggedin, function(req, res, next) {
sess=req.session;
res.send(sess);

});
router.get('/logout',function(req,res){
  req.logout()
  res.redirect('/')
})
module.exports = router;
