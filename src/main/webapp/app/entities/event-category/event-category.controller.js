(function() {
    'use strict';

    angular
        .module('aipgApp')
        .controller('EventCategoryController', EventCategoryController);

    EventCategoryController.$inject = ['EventCategory'];

    function EventCategoryController(EventCategory) {

        var vm = this;

        vm.eventCategories = [];

        loadAll();

        function loadAll() {
            EventCategory.query(function(result) {
                vm.eventCategories = result;
                vm.searchQuery = null;
            });
        }
    }
})();
