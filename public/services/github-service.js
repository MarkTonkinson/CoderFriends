var app = angular.module('coderFriendsApp');

app.service('githubService', function($http, $q){
	this.getFollowing = function(){
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: 'http://localhost:8888/api/github/following'
		}).then(function(response){
			deferred.resolve(response);
			console.log(response);
		});
		return deferred.promise
	}
})