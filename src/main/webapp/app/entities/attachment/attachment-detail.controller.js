(function() {
    'use strict';

    angular
        .module('aipgApp')
        .controller('AttachmentDetailController', AttachmentDetailController);

    AttachmentDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Attachment', 'User', 'Event', 'Entry'];

    function AttachmentDetailController($scope, $rootScope, $stateParams, previousState, entity, Attachment, User, Event, Entry) {
        var vm = this;

        vm.attachment = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('aipgApp:attachmentUpdate', function(event, result) {
            vm.attachment = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
