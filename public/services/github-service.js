var app = angular.module('coderFriendsApp');

app.service('githubService', function($http, $q){
	this.getFollowing = function(){
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: 'http://localhost:8888/api/github/following'
		}).then(function(response){
			deferred.resolve(response);
			//console.log(response);
		});
		return deferred.promise
	}

	this.getFriendActivity = function(username){
		console.log(username);
		var deferred = $q.defer();
		$http({
			method:'GET',
			url: '/api/github/' + username + '/activity'
		}).then(function(response){
			var dataArray = response.data;
				var events = [];
				for(var i = 0; i < 10; i++) {
					if(dataArray[i].type === "PushEvent"){
						dataArray[i].type = "Pushed a change to:";
					} else if (dataArray[i].type === "ForkEvent"){
						dataArray[i].type = "Forked"
					} else if (dataArray[i].type === "CreateEvent"){
						dataArray[i].type = "Created"
					}
					events.push(dataArray[i]);
				}
			deferred.resolve(events);
			console.log(response.data);
		});
		return deferred.promise
	}
})