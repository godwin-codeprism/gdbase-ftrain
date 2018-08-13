var runFunction = function ($transitions, authService, $state) {
    $transitions.onBefore({}, function (trans) {
        if (trans.$to().name != "login" && trans.$to().name != "signup") {
            $('section#content').css({
                'height': '100%'
            });

            if (localStorage.getItem("gdbaseToken") != null) {
                authService
                    .checkToken(
                        localStorage.getItem("gdbaseToken").split("|")[0],
                        localStorage.getItem("gdbaseToken")
                    )
                    .then(function (res) {
                        if (res != "good") {
                            console.log("Token mismatch");
                            localStorage.removeItem("gdbaseToken");
                            $state.go("login");
                        }
                    });
            } else {
                console.log("Token missing");
                $state.go("login");
            }
        } else {
            // change section height if signup or login page
            $('section#content').css({
                'height': '700px'
            });
        }
        if (trans.$to().name == "login") {
            if (localStorage.getItem("gdbaseToken") != null) {
                authService
                    .checkToken(
                        localStorage.getItem("gdbaseToken").split("|")[0],
                        localStorage.getItem("gdbaseToken")
                    )
                    .then(function (res) {
                        if (res == "good") {
                            console.log("Token matched");
                            $state.go("dashboard.modules", {
                                user: localStorage.getItem("gdbaseToken").split("|")[0]
                            });
                        } else {
                            console.log("Token mismatch");
                        }
                    });
            }
        }
    });
    $transitions.onSuccess({}, function (trans) {
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="tooltip"]').click(function () {
            $('[data-toggle="tooltip"]').tooltip("hide");
        });
    });
};
runFunction.$inject = ["$transitions", "authService", "$state"];
angular.module('gdbaseFtrain', ["ngSanitize", "ui.router"])
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/login");
            $stateProvider
                .state("login", {
                    url: "/login",
                    templateUrl: baseURL + "views/login.html?v=1.1",
                    controller: "loginController"
                })
                .state("signup", {
                    url: "/signup",
                    templateUrl: baseURL + "views/signup.html?v=1.1",
                    controller: "signupController"
                })
                .state("dashboard", {
                    url: '/dashboard',
                    templateUrl: baseURL + "views/dashboard.html?v=1.1",
                    controller: "dashboardController"
                })
                .state("dashboard.modules", {
                    url: '/modules',
                    templateUrl: baseURL + "views/modules.html?v=1.1"
                })
                .state("dashboard.offer",{
                    url:'/offre',
                    templateUrl: baseURL + "views/offer.html?v=1.1"
                })
                .state("dashboard.player",{
                    url:'/:videokey',
                    templateUrl: baseURL + "views/player.html?v=1.1",
                    controller: 'playerController',
                    params:{
                        videoData: null
                    }
                })
        }
    ]).run(runFunction);