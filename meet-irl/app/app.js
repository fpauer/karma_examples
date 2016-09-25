(function() {
    'use strict';

    angular.module('meetIrl', [
        'ui.router',
        'api.users',
        'components.users',
        'components.missingno' // add missingno component
    ])
        .config(function($urlRouterProvider) {
            $urlRouterProvider.otherwise("/users");
        });
})();