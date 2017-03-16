(function() {
    'use strict';
    angular
        .module('aipgApp')
        .factory('EntryCategory', EntryCategory);

    EntryCategory.$inject = ['$resource'];

    function EntryCategory ($resource) {
        var resourceUrl =  'api/entry-categories/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
