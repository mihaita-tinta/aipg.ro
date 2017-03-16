(function() {
    'use strict';

    angular
        .module('aipgApp')
        .controller('EntryCategoryDeleteController',EntryCategoryDeleteController);

    EntryCategoryDeleteController.$inject = ['$uibModalInstance', 'entity', 'EntryCategory'];

    function EntryCategoryDeleteController($uibModalInstance, entity, EntryCategory) {
        var vm = this;

        vm.entryCategory = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            EntryCategory.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
