module.exports = angular.module('fastflowApp.newCard', ['ngRoute', 'MassAutoComplete', 'ngSanitize', 'angular-medium-editor', 'toaster', 'ngAnimate'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/newCard/:tag', {
			templateUrl: 'newCard/newCard.html',
			controller: 'newCardCtrl'
		})

		$routeProvider.when('/newCard', {
			templateUrl: 'newCard/newCard.html',
			controller: 'newCardCtrl'
		})
	}])
	.controller('newCardCtrl', ['$scope', 'toaster', '$routeParams', function($scope, toaster, $routeParams) {
		jQuery('.chips').material_chip()
		jQuery('.chips-initial').material_chip({
			data: [{
				tag: 'Apple',
			}, {
				tag: 'Microsoft',
			}, {
				tag: 'Google',
			}],
		})
		jQuery('.chips-placeholder').material_chip({
			placeholder: 'Enter a tag',
			secondaryPlaceholder: '+Tag',
		})

		if ($routeParams.tag) {
			var decodedURI = decodeURIComponent($routeParams.tag)
			console.log('opening card: ' + decodedURI)
			FileArray = ipcRenderer.sendSync('FileOpen', decodedURI)
			if (FileArray == []) console.log('error, card not found')
			$scope.title = FileArray[0]
			$scope.tags = FileArray[1]
			$scope.content = FileArray[2]
		} else {
			console.log('new card creator')
			$scope.newDoc = true
			$scope.content = "Content:"
		}
		$scope.showSave = false
		$scope.showDelete = false


		$scope.saveFunction = function() {
			if ($scope.title === "" || $scope.title === null || $scope.title === undefined) {
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

		$scope.deleteFunction = function() {
			ipcRenderer.send('FileRemove', $scope.title)
			toaster.pop('note', "Card Deleted", "");
			window.location.replace('#index')
		}

		$scope.buttonShow = function() {
			if (!$scope.newDoc) {
				$scope.showDelete = true
			}
			$scope.showSave = true
		}
	}])