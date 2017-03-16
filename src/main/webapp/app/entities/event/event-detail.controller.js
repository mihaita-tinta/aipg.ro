(function() {
    'use strict';

    angular
        .module('aipgApp')
        .controller('EventDetailController', EventDetailController);

    EventDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'Event', 'EventCategory', 'User'];

    function EventDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, Event, EventCategory, User) {
        var vm = this;

        vm.event = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('aipgApp:eventUpdate', function(event, result) {
            vm.event = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
