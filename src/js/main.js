!(function(){
	'use strict';
	var app = angular.module('jellybeans',[]);

	app.service('dataService',['$http',function( $http ){ // '$http' to avoid .min.js problem
		this.helloWorld = function(){
			alert('hello world!');
		}

		this.getGuesses = function( callback ){
			$http.get('data/guesses.json')
			.then( callback );
		}
	}]);

	app.controller('mainCtrl',['$scope','dataService',function( $scope, dataService ){ // '$scope', 'dataService' to avoid .min.js problem
		$scope.helloWorld = dataService.helloWorld;
		$scope.user = {
			guesses: {}
		};
		$scope.currentForm = 0;

		dataService.getGuesses(function(res){
			$scope.guesses = res.data;
		});

		$scope.addGuess = function(title,guess){
			$scope.user.guesses[title] = guess;
			$scope.currentForm++;
		};

	}]);

	app.directive('jellybeans',function(){
		return {
			templateUrl: '../templates/jellybeans.html',
			controller: 'mainCtrl',
		}
	});

})();