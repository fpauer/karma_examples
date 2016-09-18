(function() {
    'use strict';

    // Define the component and controller we loaded in our test
    angular.module('api.pokemon', [])
        .factory('Pokemon', function($http) {
            var API = 'http://pokeapi.co/api/v2/pokemon/';
            var Pokemon = {};

            // Spy on this method chained with callThrough() allows it to continue to continue to $http.get()
            Pokemon.findByName = function(name) {
                return $http.get(API + name)
                    .then(function(res) {
                        return res.data;
                    })
                    .catch(function(res) {
                        return res.data;
                    });
            };

            return Pokemon;
        });
})();