describe('components.profile', function() {
    var $controller, PokemonFactory, $q, $httpBackend;
    var API = 'http://pokeapi.co/api/v2/pokemon/';
    var RESPONSE_SUCCESS = {
        'id': 58,
        'name': 'growlithe',
        'sprites': {
            'front_default': 'http://pokeapi.co/media/sprites/pokemon/58.png'
        },
        'types': [{
            'type': { 'name': 'fire' }
        }]
    };

    // Load ui.router and our components.profile module which we'll create next
    beforeEach(angular.mock.module('ui.router'));
    beforeEach(angular.mock.module('api.pokemon'));
    beforeEach(angular.mock.module('components.profile'));

    // Inject Pokemon factory, $q, and $httpBackend for testing HTTP requests
    beforeEach(inject(function(_$controller_, _Pokemon_, _$q_, _$httpBackend_) {
        $controller = _$controller_;
        PokemonFactory = _Pokemon_;
        $q = _$q_;
        $httpBackend = _$httpBackend_;
    }));

    describe('ProfileController', function() {
        var ProfileController, singleUser;

        beforeEach(function() {
            // Define singleUser and add resolvedUser as a dependency to our controller
            singleUser = {
                id: '2',
                name: 'Bob',
                role: 'Developer',
                location: 'New York',
                twitter: 'billybob',
                pokemon: { name: 'growlithe' }
            };

            ProfileController = $controller('ProfileController', { resolvedUser: singleUser, Pokemon: PokemonFactory});
        });

        it('should be defined', function() {
            expect(ProfileController).toBeDefined();
        });
    });

    describe('Profile Controller with a valid resolved user', function() {
        var ProfileController, singleUser;

        beforeEach(function() {
            // Define singleUser and add resolvedUser as a dependency to our controller
            singleUser = {
                id: '2',
                name: 'Bob',
                role: 'Developer',
                location: 'New York',
                twitter: 'billybob',
                pokemon: { name: 'growlithe' }
            };

            // Add spy to service call
            spyOn(PokemonFactory, "findByName").and.callThrough();

            // Add the valid user as our resolved dependency
            ProfileController = $controller('ProfileController', { resolvedUser: singleUser, Pokemon: PokemonFactory });
        });

        it('should set the view model user object to the resolvedUser', function() {
            expect(ProfileController.user).toEqual(singleUser);
        });

        it('should call Pokemon.findByName and return a Pokemon object', function() {
            // Add expectations before the request is finished
            expect(ProfileController.user.pokemon.id).toBeUndefined();
            expect(ProfileController.user.pokemon.name).toEqual('growlithe');
            expect(ProfileController.user.pokemon.image).toBeUndefined();
            expect(ProfileController.user.pokemon.type).toBeUndefined();

            // Add our HTTP request expectation and resolved response value
            $httpBackend.whenGET(API + singleUser.pokemon.name).respond(200, $q.when(RESPONSE_SUCCESS));
            $httpBackend.flush();

            // Add expectations after the request is finished
            expect(PokemonFactory.findByName).toHaveBeenCalledWith('growlithe');
            expect(ProfileController.user.pokemon.id).toEqual(58);
            expect(ProfileController.user.pokemon.name).toEqual('growlithe');
            expect(ProfileController.user.pokemon.image).toContain('.png');
            expect(ProfileController.user.pokemon.type).toEqual('fire');
        });
    });
});