angular.module('gdbaseFtrain')
    .controller('dashboardController', ['$scope', '$http', '$state', '$interval', function ($scope, $http, $state, $interval) {
        var Timeloop = null;
        $scope.modules = [];
        $scope.activeModule = null;
        $scope.currentTimes = [];
        $scope.startTime = {
            module1: null,
            module2: null,
            module3: null,
            module4: null,
            module5: null
        };
        $http.get(baseURL + 'database/modules.json')
            .then(function (res) {
                $scope.modules = res.data;
                $scope.activeModule = $scope.modules[0];
            });
        $http.post(baseURL + 'server/get-user-data.php', localStorage.getItem("gdbaseToken").split("|")[0])
            .then(function (res) {
                if (res.data.ftrain) {
                    $scope.startTime = JSON.parse(res.data.ftrain);
                    StartTimer();
                } else {
                    var today = new Date(Date.now());
                    $scope.startTime = {
                        module1: Date.now(),
                        module2: today.setHours(today.getHours() + 24),
                        module3: today.setHours(today.getHours() + 24),
                        module4: today.setHours(today.getHours() + 24),
                        module5: today.setHours(today.getHours() + 24)
                    };
                    $http.post(baseURL + 'server/update-ftrain.php', {
                        username: localStorage.getItem("gdbaseToken").split("|")[0],
                        ftrain: $scope.startTime
                    }).then(function (res) {
                        StartTimer();
                    }).catch(function (err) {
                        console.log(err);
                    })
                }
            })
        $scope.changeActiveModule = function (num) {
            $state.go('dashboard.modules');
            $scope.activeModule = $scope.modules[num];
        }

        $scope.openPlayer = function (num) {
            $state.go('dashboard.player', {
                videokey: $scope.activeModule.videos[num].key,
                videoData: $scope.activeModule.videos[num]
            })
        }

        function StartTimer() {
            Timeloop = $interval(function () {
                var temp = [];
                Object.keys($scope.startTime).forEach(function (item) {
                    var countDownDate = new Date($scope.startTime[item]).getTime();
                    var now = new Date().getTime();
                    var distance = countDownDate - now;
                    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                    // If the count down is finished, write some text 
                    if (distance < 0) {
                        temp.push('(disponible)');
                    } else {
                        temp.push("(disponible dans " + days + "d " + hours + "h " + minutes + "m " + seconds + "s)");
                    }
                });
                $scope.currentTimes = temp;
            }, 1000);
        }

        function stopTimer() {
            $interval.cancel(Timeloop);
            console.log('Timer Stopped');
        }
    }])