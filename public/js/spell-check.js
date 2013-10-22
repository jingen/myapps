// controller for words' spell checking
apps.controller('SpellCheck', ['$scope', '$http', function($scope, $http){
  $scope.results = [];
  // ajax, send the users' input to server, server check the input and send back the results and show them on the page.
  $scope.check = function(){
    var words = {
      words: $scope.words
    };
    $http({
      url: '/words/check',
      method: 'post',
      data: words,
      responseType: "json"
    }).success(function(data){
      $scope.results = data;
    });
  }
}]);
