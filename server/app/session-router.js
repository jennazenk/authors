var router = require('express').Router();
var session = require('express-session');
var db = require('../_db');
//var Story = require('../api/stories/story.model');
var User = require('../api/users/user.model');


router.post('/login', function(req, res, next) {
    User.findOne({
            where: req.body
        })
        .then(function(user) {
            if (!user) {
                res.sendStatus(401);
            } else {
                req.session.userId = user.id; //persists the user to the session
                res.status(204).json(user);
            }
        })
        .catch(next);
});

router.put('/signup', function(req, res, next) {
    User.create(req.body)
    .then(function(user) {
        req.session.userId = user.id;
        res.send(user);
    })
        
});

router.delete('/logout',function(req,res,next){

    if(req.session){
        req.session.destroy()
        res.send('Session ended');
    } else{
        res.send('No active session',500);
    }
})

//zeke@zeke.zeke




module.exports = router;
