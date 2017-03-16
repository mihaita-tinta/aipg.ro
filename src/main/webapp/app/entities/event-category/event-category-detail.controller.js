(function() {
    'use strict';

    angular
        .module('aipgApp')
        .controller('EventCategoryDetailController', EventCategoryDetailController);

    EventCategoryDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'EventCategory'];

    function EventCategoryDetailController($scope, $rootScope, $stateParams, previousState, entity, EventCategory) {
        var vm = this;

        vm.eventCategory = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('aipgApp:eventCategoryUpdate', function(event, result) {
            vm.eventCategory = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
