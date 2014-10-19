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
.when('/friend/:github_username', {
	templateUrl: 'templates/friend.html',
	controller: 'friendCtrl',
	resolve: {
		eventData: function($route, githubService){
			githubService.getFriendActivity($route.current.params.github_username);
		}
	}
})
.when('/403', {
	template: '<h2>You do not have permission to come to this page</h2>'
})
.otherwise({
	redirectTo: '/'
})

}]);

app.config(function($httpProvider) {
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    $httpProvider.interceptors.push('myHttpInterceptor');
});

// register the interceptor as a service
app.factory('myHttpInterceptor', function($q) {
    return {
        // optional method
        'responseError': function(rejection) {
            if (rejection.status == 403) {
                document.location = '/403';
                return;
            }
            return $q.reject(rejection);
        }
    };
});