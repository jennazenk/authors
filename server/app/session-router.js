var router = require('express').Router();
var session = require('express-session');
var db = require('../_db');
//var Story = require('../api/stories/story.model');
var User = require('../api/users/user.model');


router.post('/', function(req, res, next) {

	console.log(req.session.cookie);

    User.findOne({
            where: req.body
        })
        .then(function(user) {
            if (!user) {
                res.sendStatus(401);
            } else {
                req.session.userId = user.id; //persists the user to the session
                res.sendStatus(204);
            }
        })
        .catch(next);
});

module.exports = router;
