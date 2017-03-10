$(document).ready(function(){
	$('.collapsible').collapsible({
		accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
	});
});

module.exports = angular.module('fastflowApp.cardManager', ['ngRoute'])
	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/cardManager', {
			templateUrl: 'cardManager/cardManager.html',
			controller: 'cardManagerCtrl'
		})
	}])
	.controller('cardManagerCtrl', ['$scope', 'defaultNav', function($scope, defaultNav) {
		$scope.$on('$routeChangeStart', function(event, next, current) {
			if (next.$$route) {
				if (next.$$route.controller === "indexCtrl") {
					$scope.transitionClass = 'exitRight'
					console.log('exitLeft because indexCtrl')
				} else {
					$scope.transitionClass = 'exitLeft'
				}
			}
 		})

		$scope.$parent.setNav(defaultNav, 'Cards')
		jQuery('.tooltipped').tooltip({delay: 50})
		$scope.dataJSON = ipcRenderer.sendSync('CardManager', 'ready')
		$scope.sTags = Object.keys($scope.dataJSON)
		console.log($scope.sTags)
		$scope.URIGenerate = function(name) {
			return encodeURIComponent(name)
		}

		$scope.openCard = function (cardID) {
			card = ipcRenderer.sendSync('FileOpen', cardID)
			if (card == []) console.log('error, card not found')
			$scope.modalCardTag = cardID
			$scope.modalCardContent = card.content
			$scope.modalCardCite = card.citation

			$('#cardModal').openModal()
		}

		$scope.openMultiCard = function (tag) {
			window.location.replace('#!/cardMulti/' + $scope.URIGenerate(tag))
		}

		$scope.fullscreen = function () {
			$('#cardModal').closeModal()
			window.location.replace('#!/card/' + $scope.URIGenerate($scope.modalCardTag))
		}
		$scope.detach = function () {
			$('#cardModal').closeModal()
			window.open('#!/cardDetach/' + $scope.URIGenerate($scope.modalCardTag))
		}
  }])
