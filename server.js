var express = require('express');
var session = require('express-session');
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var GitHubApi = require('github');

var userObj = {};

var app = express();
var github = new GitHubApi({
	    // required
	    version: "3.0.0",
	    // optional
	});



app.use(express.static(__dirname + '/public'));
app.use(session ({secret: 'I am the secret'}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done){
	done(null, user);
});

passport.deserializeUser(function(obj, done){
	done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID:   '98afca080a10daf36d24',
    clientSecret: 'efcefcfccc15780090d5cffe11a6dd740557b045',
    callbackURL: "http://localhost:8888/auth/github/callback"
  },
 function(accessToken, refreshToken, profile, done) {
    userObj = profile;
    process.nextTick(function () {
      
      return done(null, profile);
    });
  }
));
console.log('user obj',  userObj.username);

app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback', passport.authenticate('github',{ 
	failureRedirect: '/auth/github'
	}), function(req, res){
		console.log('this is the data it gave me ' , req.user);
		return 	res.redirect('/#/home');
});

//need middleware- get user followers


//this does need to  go before, or it won't run

//if I declared the function as a variable (which I could have) I could pass the name of the function in, or adding the route means it happens with each related route 'api/github'
var userFollowers = function(req, res, next){
	var followers;
	//github.user.getFollowingFromUser({}, function(err, data))
	github.user.getFollowingFromUser({
		    user: "MarkTonkinson"
		}, function(err, data) {
			console.log('error', err);
		    //console.log('just some info', JSON.stringify(data));
		    var info = JSON.stringify(data)
		    userObj.followers = info;
		    console.log('userObj 2nd time', userObj);
		    //console.log('follower1', followers)
		    next(); //you have to put next inside
		})
	//next() if next is right here it doesn't wait for the process to happen
	//I just wrote my first piece of middleware :)
	
}



app.get('/api/github/following', userFollowers, function(req, res, next){
	res.send(userObj.followers);
	

 });

//what we tried with Jake
// var followers = [];
// var getFollowers = function(){
// 	github.user.getFollowingFromUser({
// 	    user: user.username
// 	}, function(err, data){
// 		 followers = data;
// 		 return followers;
// 	});
// }

// app.get('/api/github/following', function(req, res){
// 	getFollowers();
// 	res.status(200).send(followers);
// });



app.listen(8888, function(){
	console.log('serving you at port 8888');
});





