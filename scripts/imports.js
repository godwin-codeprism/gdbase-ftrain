if (location.origin == "https://www.gdbase.be") {
    // production
    window.baseURL = "https://www.gdbase.be/ftrain/";
    window.$ = jQuery;
} else {
    // development
    window.jQuery = require('jquery');
    window.$ = jQuery;
    window.baseURL = "";
}

window.angular = require('angular');
require('../node_modules/animate.css/animate.css');
require('../node_modules/bootstrap-sass/assets/javascripts/bootstrap');
require('../node_modules/angular-sanitize');
require('../node_modules/angular-ui-router');
require('../node_modules/angular-animate/angular-animate');

//********************// CSS - Libs
require('../css/bootgodwin.css');
require('../css/font-awesome.css');
require('../css/ionicons.css');
require('../css/dashboard.css');

//Godwin CSS
require('../css/login.css');
require('../css/globals.css');


//Godwin Scripts
require('../scripts/config');
require('../scripts/signup.controller');
require('../scripts/login.controller');
require('../scripts/modules.controller');
require('../scripts/dashboard.controller');
require('../scripts/player.controller');

//services
require('../scripts/auth.service');