(function() {
    'use strict';

    angular
        .module('aipgApp')
        .controller('CommentController', CommentController);

    CommentController.$inject = ['DataUtils', 'Comment'];

    function CommentController(DataUtils, Comment) {

        var vm = this;

        vm.comments = [];
        vm.openFile = DataUtils.openFile;
        vm.byteSize = DataUtils.byteSize;

        loadAll();

        function loadAll() {
            Comment.query(function(result) {
                vm.comments = result;
                vm.searchQuery = null;
            });
        }
    }
})();
