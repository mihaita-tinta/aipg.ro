(function() {
    'use strict';
    angular
        .module('aipgApp')
        .factory('Event', Event);

    Event.$inject = ['$resource', 'DateUtils'];

    function Event ($resource, DateUtils) {
        var resourceUrl =  'api/events/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.date = DateUtils.convertDateTimeFromServer(data.date);
                        data.scheduled = DateUtils.convertDateTimeFromServer(data.scheduled);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
