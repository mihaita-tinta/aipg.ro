(function() {
    'use strict';
    angular
        .module('aipgApp')
        .factory('Attachment', Attachment);

    Attachment.$inject = ['$resource', 'DateUtils'];

    function Attachment ($resource, DateUtils) {
        var resourceUrl =  'api/attachments/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.date = DateUtils.convertDateTimeFromServer(data.date);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
