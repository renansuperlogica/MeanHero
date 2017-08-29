var myApp = angular.module('myApp',['ngRoute']);

myApp.config(function($routeProvider){
	$routeProvider.when('/', {
		controller:'dashboard.component.ts',
		templateUrl: 'views/dashboard.component.html'
	})
	.when('/heroi', {
		controller:'heroes.component.ts',
		templateUrl: 'views/heroes.component.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});