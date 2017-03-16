(function() {
    'use strict';

    angular
        .module('aipgApp')
        .controller('EntryCategoryDialogController', EntryCategoryDialogController);

    EntryCategoryDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'EntryCategory'];

    function EntryCategoryDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, EntryCategory) {
        var vm = this;

        vm.entryCategory = entity;
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
            if (vm.entryCategory.id !== null) {
                EntryCategory.update(vm.entryCategory, onSaveSuccess, onSaveError);
            } else {
                EntryCategory.save(vm.entryCategory, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('aipgApp:entryCategoryUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
