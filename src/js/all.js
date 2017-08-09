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
!(function(){
	// var users = {};
	// function loadJSON(path, success, error){
	//     var xhr = new XMLHttpRequest();
	//     xhr.onreadystatechange = function()
	//     {
	//         if (xhr.readyState === XMLHttpRequest.DONE) {
	//             if (xhr.status === 200) {
	//                 if (success)
	//                     success(JSON.parse(xhr.responseText));
	//             } else {
	//                 if (error)
	//                     error(xhr);
	//             }
	//         }
	//     };
	//     xhr.open("GET", path, true);
	//     xhr.send();
	// }

	// var jsonPromise = new Promise(function(res, rej){
	// 	loadJSON('../data/users.json',
	//         function(data){res(data);},
	//         function(xhr){console.error(xhr);}
	// 	)
	// });

	// jsonPromise.then(function(users){
	// 	users.names = [];
	// 	users.mms = [];
	// 	users.toothpicks = [];
	// 	users.skittles = [];
	// 	users.coins = [];
 //    	for (var i = 0; i < users.length; i++) {
 //    		users.names.push(users[i].email);
 //    		users.mms.push(users[i].mms);
 //    		users.toothpicks.push(users[i].toothpicks);
 //    		users.skittles.push(users[i].skittles);
 //    		users.coins.push(users[i].coins);
 //    	};
 //    	return users;
	// }).then(function(users){
	// 	function createChart(canvasId,data){
	// 		var sum = 0;
	// 		for (var i = 0; i < data.length; i++) {
	// 			sum += parseInt(data[i],10); // decimal base
	// 		}

	// 		var avg = sum/data.length;
	// 		var avgArray = [];
	// 		for (var i = 0; i < data.length; i++) {
	// 			avgArray.push(avg);
	// 		};

	// 		var ctx = document.getElementById('myChart').getContext('2d');
	// 		var myChart = new Chart(ctx, {
	// 		    "type": "line",
	// 		    "data": {
	// 		        "labels": users.names,
	// 		        "datasets": [{
	// 		            "label": "User M&Ms guesses",
	// 		            "data": data,
	// 		            "fill": true,
	// 		            "borderColor": "rgb(0,0, 192)",
	// 		            "lineTension": 0.1
	// 		        }, {
	// 		            "label": "Average",
	// 		            "data": avgArray,
	// 		            "fill": false,
	// 		            "borderColor": "rgb(75, 192, 192)",
	// 		            "lineTension": 0.1,
	// 		            "pointRadius": 0
	// 		        }, {
	// 		            "label": "Correct answer",
	// 		            "data": [45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45],
	// 		            "fill": false,
	// 		            "borderColor": "rgb(255,255,0)",
	// 		            "lineTension": 0.1,
	// 		            "pointRadius": 0
	// 		        }
	// 		        ]
	// 		    },
	// 		    "options": {

	// 		    }
	// 		});
	// 	}
	// 	createChart('m&ms',users.mms);
	// 	// createChart('toothpicks',users.toothpicks);
	// 	// createChart('skittles',users.skittles);
	// 	// createChart('coins',users.coins);
	// })

	// var ctx = document.getElementById("myChart").getContext('2d');
	// var myChart = new Chart(ctx, {
	//     "type": "line",
	//     "data": {
	//         "labels": users.names,
	//         "datasets": [{
	//             "label": "My First Dataset",
	//             "data": [74,83,11,18,80,95,19,14,29,78],
	//             "fill": true,
	//             "borderColor": "rgb(0,0, 192)",
	//             "lineTension": 0.1
	//         }, {
	//             "label": "Average",
	//             "data": [30,30,30,30,30,30,30,30,30,30],
	//             "fill": false,
	//             "borderColor": "rgb(75, 192, 192)",
	//             "lineTension": 0.1,
	//             "pointRadius": 0
	//         }, {
	//             "label": "Correct answer",
	//             "data": [45,45,45,45,45,45,45,45,45,45],
	//             "fill": false,
	//             "borderColor": "rgb(255,255,0)",
	//             "lineTension": 0.1,
	//             "pointRadius": 0
	//         }]
	//     },
	//     "options": {

	//     }
	// });
})();

