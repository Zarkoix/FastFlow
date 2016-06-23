module.exports = angular.module('fastflowApp.card', ['ngRoute', 'MassAutoComplete', 'ngSanitize', 'angular-medium-editor', 'toaster', 'ngAnimate'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/card', {
			templateUrl: 'card/card.html',
			controller: 'cardCtrl'
		})
	}])
	.controller('cardCtrl', ['$scope', 'toaster', function($scope, toaster) {
		$scope.showSave = false
		$scope.showDelete = false
    $scope.newDoc = true

    $scope.saveFunction = function () {
			if($scope.title === "" || $scope.title === null || $scope.title === undefined) {
				toaster.error("Card Title is Empty", "A Card has no name...")
			} else if ($scope.tags === "" || $scope.tags === null || $scope.tags === undefined) {
				toaster.pop('error', "Card Tags are Empty", "Tell FastFlow where to find your card!")
			} else if ($scope.content === "" || $scope.content === null || $scope.title === undefined) {
				toaster.pop('error', "Card has no content", "Tell FastFlow what information to remember!")
			} else {
				ipcRenderer.send('FileSave', [$scope.title, $scope.tags, $scope.content])
				toaster.pop('success', "Card Saved", "");
			}
    }

    $scope.deleteFunction = function () {
      ipcRenderer.send('FileRemove', $scope.title)
			toaster.pop('note', "Card Deleted", "");
      window.location.replace('#index')
    }

    $scope.buttonShow = function () {
      if (!$scope.newDoc){
        $scope.showDelete = true
      }
      $scope.showSave = true
    }
  }])
