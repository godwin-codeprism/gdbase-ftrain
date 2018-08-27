angular.module('gdbaseFtrain')
  .controller('modulesController', ['$scope', '$http', function ($scope, $http) {
    $scope.question = '';
    $scope.enableQuesSend = true;

    $scope.onQuestionTyped = function () {
      $scope.enableQuesSend = $scope.question == "";
    }

    $scope.sendQuestion = function () {
      var data = $scope.$parent.userData;
      data.question = $scope.question;
      $scope.enableQuesSend = true;
      $http.post(baseURL + 'server/send-qes-mail.php', data)
          .then(function (res) {
              if (res.data == "MailDelivered") {
                  alert('Question envoyée avec succès.');
                  $scope.question = "";
              } else {
                  alert("Une erreur s'est produite. Veuillez réessayer");
              }
              $scope.enableQuesSend = false;
          })
          .catch(function (err) {
              console.log(err);
              alert("Une erreur s'est produite. Veuillez réessayer");
          })
    }
  }]);