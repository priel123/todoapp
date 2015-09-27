var todoConrtollers = angular.module('todoControllers', []);
  todoConrtollers.controller('TaskController', ['$scope', 'taskFactory', 
        function($scope, taskFactory) {
 function whenSaved(result)
		{
		 $scope.$apply(function () {
		 $scope.answer = result;
		});
		 }
    $scope.saveTask = function() {taskFactory.createTask($scope.idView,$scope.titleView,$scope.descView,whenSaved);
	taskFactory.getAllTasks(allTasksReturned);} ;
	
				 $scope.tasksList=[];
 function allTasksReturned(results)
		{
		 $scope.$apply(function () {
		 $scope.tasksList=[];
		 for (var i = 0; i < results.length; i++) {		
		 
					$scope.tasksList.push({
      Title: results[i].get("Title"),
	  ID:results[i].get("ID")
    });
        }
	
		});
		 }
		$scope.select = function(taskItem) {
	
    $scope.selected = taskItem.ID;

  }; 
	taskFactory.getAllTasks(allTasksReturned);
    
 
   
}]);

todoConrtollers.controller('TaskDetails', ['$scope','taskFactory', '$routeParams',
  function($scope,taskFactory, $routeParams) {
    $scope.taskID = $routeParams.taskID;
	function updateTaskFinished(results)
	{
		$scope.$apply(function () {
		$scope.isSaved=results;
		
		
    });
        }
		function getTaskFinished(results)
	{
		$scope.$apply(function () {
		$scope.Title=results.get("Title");
		$scope.Description=results.get("Description");
		
    });
        }
	function whenSaved(result)
		{
		 $scope.$apply(function () {
		 $scope.isSaved = result;
		});
		 }
		$scope.saveEditedTask=function() {taskFactory.updateTask($routeParams.taskID,$scope.detailstitleView,$scope.detailsdescView,updateTaskFinished);
	} ;
	
	taskFactory.getTasks($routeParams.taskID,getTaskFinished);
  }]);
  
  
  
   

		