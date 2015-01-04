var myApp = angular.module('myApp',['ngRoute']);

myApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
	  .when('/phonebook', {
        templateUrl: 'modules/phonebook/views/listview.html',
        controller: 'PhoneBookCtrl',
		functionName: 'listview'
      })
	  .when('/phonebook/create', {
        templateUrl: 'modules/phonebook/views/editview.html',
        controller: 'PhoneBookCtrl',
		functionName: 'createview'
      })
	  .when('/phonebook/edit/:contactid', {
        templateUrl: 'modules/phonebook/views/editview.html',
        controller: 'PhoneBookCtrl',
		functionName: 'editview'
      })
	  .otherwise({
        redirectTo: '/phonebook'
      });
  }]);

console.log("app.js");