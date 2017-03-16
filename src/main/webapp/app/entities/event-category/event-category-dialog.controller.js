(function() {
    'use strict';

    angular
        .module('aipgApp')
        .controller('EventCategoryDialogController', EventCategoryDialogController);

    EventCategoryDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'EventCategory'];

    function EventCategoryDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, EventCategory) {
        var vm = this;

        vm.eventCategory = entity;
        vm.clear = clear;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.eventCategory.id !== null) {
                EventCategory.update(vm.eventCategory, onSaveSuccess, onSaveError);
            } else {
                EventCategory.save(vm.eventCategory, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('aipgApp:eventCategoryUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
