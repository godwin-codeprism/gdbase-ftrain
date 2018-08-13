angular.module('gdbaseFtrain')
    .controller('playerController', ['$scope', '$state', '$stateParams', '$http', '$sce', function ($scope, $state, $stateParams, $http, $sce) {
        $scope.videokey = $stateParams.videokey
        console.log($scope.videokey);
        $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(src);
        }
        $scope.video = 

        $http.get('./database/modules.json')
            .then(function (res) {
                $scope.CurrentModule = res.data.find(function(i){
                    return i.videos.find(function(j){
                        return j.key === $scope.videokey;
                    })
                });
                console.log($scope.CurrentModule);
            });
    }])