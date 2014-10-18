var app = angular.module('coderFriendsApp', ['ngRoute', 'firebase']);

app.config(['$routeProvider', function($routeProvider){
$routeProvider
.when('/', {
	templateUrl: 'templates/main.html'
})
.when('/home', {
	templateUrl: 'templates/home.html',
	controller: 'homeCtrl'
})
.when('/friend', {
	templateUrl: 'templates/friend.html'
})
.otherwise({
	redirectTo: '/'
})

}]);