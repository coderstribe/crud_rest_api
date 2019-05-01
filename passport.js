var localStrategy= require('passport-local').Strategy;
var User = require('./db/user')
module.exports = function(passport){
passport.serializeUser(function(user,done) //serializers manage session
{
done(null,user)
})
passport.deserializeUser(function(user,done)//deserializers manage session
{
    done(null,user)

})
passport.use(new localStrategy(function(username,password,done){
User.findOne({username:username},function(err,doc){
    if(err){done(err)}
    else{
        if(doc){
           var valid = doc.comparePassword(password,doc.password)
        if(valid){
            done(null,{
                username:doc.username,
            password:doc.password
            })
        }
        else{
            console.log('wrong password')
            done(null,false)
        }
        }
        else{
            console.log('wrong username')
            done(null,false)
        }
    }
})
}))
}