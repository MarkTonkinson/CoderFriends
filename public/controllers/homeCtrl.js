var app = angular.module('coderFriendsApp');

app.controller('homeCtrl', function($scope, githubService){
	$scope.getFriends = function(){
		githubService.getFollowing().then(function(data){
			$scope.friends = data;
		})
	}

	$scope.getFriends();
})