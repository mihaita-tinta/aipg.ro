'use strict';

describe('Controller Tests', function() {

    describe('Entry Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockEntry, MockEntryCategory, MockUser, MockTag;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockEntry = jasmine.createSpy('MockEntry');
            MockEntryCategory = jasmine.createSpy('MockEntryCategory');
            MockUser = jasmine.createSpy('MockUser');
            MockTag = jasmine.createSpy('MockTag');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Entry': MockEntry,
                'EntryCategory': MockEntryCategory,
                'User': MockUser,
                'Tag': MockTag
            };
            createController = function() {
                $injector.get('$controller')("EntryDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'aipgApp:entryUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
