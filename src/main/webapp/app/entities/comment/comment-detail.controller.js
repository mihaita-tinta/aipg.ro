(function() {
    'use strict';

    angular
        .module('aipgApp')
        .controller('CommentDetailController', CommentDetailController);

    CommentDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'DataUtils', 'entity', 'Comment', 'Event', 'Entry', 'User'];

    function CommentDetailController($scope, $rootScope, $stateParams, previousState, DataUtils, entity, Comment, Event, Entry, User) {
        var vm = this;

        vm.comment = entity;
        vm.previousState = previousState.name;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;

        var unsubscribe = $rootScope.$on('aipgApp:commentUpdate', function(event, result) {
            vm.comment = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
