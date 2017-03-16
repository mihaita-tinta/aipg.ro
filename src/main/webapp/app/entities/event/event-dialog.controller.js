(function() {
    'use strict';

    angular
        .module('aipgApp')
        .controller('EventDialogController', EventDialogController);

    EventDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'DataUtils', 'entity', 'Event', 'EventCategory', 'User'];

    function EventDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, DataUtils, entity, Event, EventCategory, User) {
        var vm = this;

        vm.event = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
        vm.save = save;
        vm.eventcategories = EventCategory.query({filter: 'event-is-null'});
        $q.all([vm.event.$promise, vm.eventcategories.$promise]).then(function() {
            if (!vm.event.eventCategory || !vm.event.eventCategory.id) {
                return $q.reject();
            }
            return EventCategory.get({id : vm.event.eventCategory.id}).$promise;
        }).then(function(eventCategory) {
            vm.eventcategories.push(eventCategory);
        });
        vm.users = User.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.event.id !== null) {
                Event.update(vm.event, onSaveSuccess, onSaveError);
            } else {
                Event.save(vm.event, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('aipgApp:eventUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.date = false;
        vm.datePickerOpenStatus.scheduled = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
