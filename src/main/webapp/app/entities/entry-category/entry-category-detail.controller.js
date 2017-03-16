(function() {
    'use strict';

    angular
        .module('aipgApp')
        .controller('EntryCategoryDetailController', EntryCategoryDetailController);

    EntryCategoryDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'EntryCategory'];

    function EntryCategoryDetailController($scope, $rootScope, $stateParams, previousState, entity, EntryCategory) {
        var vm = this;

        vm.entryCategory = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('aipgApp:entryCategoryUpdate', function(event, result) {
            vm.entryCategory = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
