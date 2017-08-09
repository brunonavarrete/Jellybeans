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

		this.getResults = function( callback ){
			$http.get('data/users.json')
			.then( callback );
		}
	}]);

	app.controller('mainCtrl',['$scope','dataService',function( $scope, dataService ){ // '$scope', 'dataService' to avoid .min.js problem
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

	app.controller('chartCtrl',['$scope','dataService',function( $scope, dataService ){ // '$scope', 'dataService' to avoid .min.js problem

		// $scope.currentChart = 'mms';
		// $scope['mms'] = [];

		$scope.names = [];

		dataService.getResults(function(res){
			$scope.results = res.data;
			for (var i = 0; i < 10; i++) {
				$scope.names.push($scope.results[i].email);
			};
		});

		$scope.generateChart = function(chart){
			var ctx = document.getElementById("myChart").getContext('2d');
			ctx.innerHTML = 'wii';
			var myChart = new Chart(ctx, {
			    "type": "line",
			    "data": {
			        "labels": ['Name','Name','Name','Name','Name','Name','Name','Name','Name','Name'],
			        "datasets": [{
			            "label": 'Label1',
			            "data": [30,30,30,30,30,30,30,30,30,30],
			            "fill": true,
			            "borderColor": "rgb(0,0, 192)",
			            "lineTension": 0.1
			        }, {
			            "label": "Average",
			            "data": [30,30,30,30,30,30,30,30,30,30],
			            "fill": false,
			            "borderColor": "rgb(75, 192, 192)",
			            "lineTension": 0.1,
			            "pointRadius": 0
			        }, {
			            "label": "Correct answer",
			            "data": [45,45,45,45,45,45,45,45,45,45],
			            "fill": false,
			            "borderColor": "rgb(255,255,0)",
			            "lineTension": 0.1,
			            "pointRadius": 0
			        }]
			    },
			    "options": {}
			});
		};



	}]);

	app.directive('jellybeans',function(){
		return {
			templateUrl: '../templates/jellybeans.html',
			controller: 'mainCtrl',
		}
	});

	app.directive('results',function(){
		return {
			templateUrl: '../templates/chart.html',
			controller: 'chartCtrl',
		}
	});

})();