(function() {
    'use strict';

    angular
        .module('aipgApp')
        .controller('AttachmentController', AttachmentController);

    AttachmentController.$inject = ['Attachment'];

    function AttachmentController(Attachment) {

        var vm = this;

        vm.attachments = [];

        loadAll();

        function loadAll() {
            Attachment.query(function(result) {
                vm.attachments = result;
                vm.searchQuery = null;
            });
        }
    }
})();
