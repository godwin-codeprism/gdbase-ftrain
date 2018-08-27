angular.module('gdbaseFtrain')
    .controller('playerController', ['$scope', '$state', '$stateParams', '$http', '$sce', function ($scope, $state, $stateParams, $http, $sce) {
        $scope.videokey = $stateParams.videokey;
        $scope.nextActive = true;
        $scope.previousActive = false;
        var vidIndex = null;
        $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(src);
        }
        $scope.question = '';
        $scope.enableQuesSend = true;
        $http.get(baseURL + './database/modules.json')
            .then(function (res) {
                $scope.CurrentModule = res.data.modules.find(function (i) {
                    return i.videos.find(function (j, inx, arr) {
                        if (j.key === $scope.videokey) {
                            vidIndex = inx;
                            $scope.previousActive = vidIndex !== 0;
                            $scope.nextActive = vidIndex < arr.length - 1;
                            return true;
                        }
                    })
                });
            });

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
        $scope.nextVideo = function () {
            if (vidIndex < $scope.CurrentModule.videos.length - 1) {
                $state.go('dashboard.player', {
                    videokey: $scope.CurrentModule.videos[vidIndex + 1].key,
                    videoData: $scope.CurrentModule.videos[vidIndex + 1]
                })
            }
        }

        $scope.previousVideo = function () {
            if (vidIndex !== 0) {
                $state.go('dashboard.player', {
                    videokey: $scope.CurrentModule.videos[vidIndex + 1].key,
                    videoData: $scope.CurrentModule.videos[vidIndex + 1]
                })
            }
        }
    }])