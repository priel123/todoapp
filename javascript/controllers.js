//////////////main page controller//////////////
var todoConrtollers = angular.module('todoControllers', []);
  todoConrtollers.controller('TaskController', ['$scope', 'taskFactory', 
        function($scope, taskFactory) {
			 $scope.tasksList=[];
			//async update
			function whenSaved(result)
			{
				$scope.$apply(function () {
				$scope.answer = result;
			});
			}
			//async update
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
			//calls and events
			
			$scope.saveTask = function() {taskFactory.createTask($scope.idView,$scope.titleView,$scope.descView,whenSaved);
			taskFactory.getAllTasks(allTasksReturned);} ;
			taskFactory.getAllTasks(allTasksReturned);
    
 
   
		}]);
////////////task page controller//////////////////////
todoConrtollers.controller('TaskDetails', ['$scope','taskFactory', '$routeParams',
  function($scope,taskFactory, $routeParams) {
    $scope.taskID = $routeParams.taskID;//display task ID
	//async update
	function updateTaskFinished(results)
	{
		$scope.$apply(function () {
		$scope.isSaved=results;
		
		
    });
        }
	//async update	
	function getTaskFinished(results)
	{
		$scope.$apply(function () {
		$scope.Title=results.get("Title");
		$scope.Description=results.get("Description");
		
    });
        }
	//calls and events
	$scope.saveEditedTask=function() {taskFactory.updateTask($routeParams.taskID,$scope.detailstitleView,$scope.detailsdescView,updateTaskFinished);};
	taskFactory.getTasks($routeParams.taskID,getTaskFinished);
  }]);
  
  
  
   

		