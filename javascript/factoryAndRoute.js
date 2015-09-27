var myApp = angular.module('todo',  ['ngRoute','todoControllers']);
myApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/main', {
        templateUrl: 'partials/main.html',
        controller: 'TaskController'
      }).
      when('/task/:taskID', {
        templateUrl: 'partials/task.html',
        controller: 'TaskDetails'
      }).
      otherwise({
        redirectTo: '/main'
      });
  }]);
   //////////////////////////task factory
  myApp.factory('taskFactory',  [function() {
  
     return {
	 
	createTask: function(id,title,desc,whenSaved)
   {
		var Task = Parse.Object.extend("Task");
		var task = new Task();
		task.set("ID", id);
		task.set("Title", title);
		task.set("Description", desc);

		task.save(null, {
		  success: function(task,ans) {
		
			whenSaved("saved");
		
		  },
		  error: function(task, error,ans) {
		 
		   whenSaved( "not saved");
		
		  }
		});
		
		return "";
	},
	getAllTasks: function(func)
	{
		var Task = Parse.Object.extend("Task");
		var query = new Parse.Query(Task);
		query.find({
			success: function (results) {
			
		func(results);
    },
    error: function (error) {
        alert("Error: " + error.code + " " + error.message);
    }
	
	});
	return "";
	}
	,
	getTasks: function(ID,func)
	{
		var x=parseInt(ID,10);
		var Task = Parse.Object.extend("Task");
		var query = new Parse.Query(Task);
		query.equalTo("ID", x);
		query.find({
			success: function (results) {
			
		func(results[0]);
    },
    error: function (error) {
        alert("Error: " + error.code + " " + error.message);
    }
	
	});
	return "";
	}
	,
	updateTask: function(ID,Title,Description,func)
	{
		var x=parseInt(ID,10);
		var Task = Parse.Object.extend("Task");
		var query = new Parse.Query(Task);
		query.equalTo("ID", x);
		query.find({
			success: function (results) {
			
		var res=results[0];
		res.set("Title",Title);
		res.set("Description",Description);
		res.save(null, {
		  success: function(res,ans) {
		
			func("saved");
		
		  },
		  error: function(res, error,ans) {
		 
		   func( "not saved");
		
		  }
		});
    },
    error: function (error) {
        alert("Error: " + error.code + " " + error.message);
    }
	
	});
	return "";
	}
}}]);