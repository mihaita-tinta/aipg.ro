(function() {
    'use strict';

    angular
        .module('aipgApp')
        .controller('EntryCategoryController', EntryCategoryController);

    EntryCategoryController.$inject = ['EntryCategory'];

    function EntryCategoryController(EntryCategory) {

        var vm = this;

        vm.entryCategories = [];

        loadAll();

        function loadAll() {
            EntryCategory.query(function(result) {
                vm.entryCategories = result;
                vm.searchQuery = null;
            });
        }
    }
})();
