angular.module('gdbaseFtrain')
    .controller('playerController', ['$scope', '$state', '$stateParams', '$http', '$sce', function ($scope, $state, $stateParams, $http, $sce) {
        $scope.videokey = $stateParams.videokey
        console.log($scope.videokey);
        $scope.trustSrc = function (src) {
            return $sce.trustAsResourceUrl(src);
        }
        $http.get('./database/modules.json')
            .then(function (res) {
                $scope.CurrentModule = res.data.modules.find(function(i){
                    return i.videos.find(function(j){
                        return j.key === $scope.videokey;
                    })
                });
                console.log($scope.CurrentModule);
            });
    }])