(function() {
    'use strict';

    angular
        .module('aipgApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('event-category', {
            parent: 'entity',
            url: '/event-category',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'aipgApp.eventCategory.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/event-category/event-categories.html',
                    controller: 'EventCategoryController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('eventCategory');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('event-category-detail', {
            parent: 'event-category',
            url: '/event-category/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'aipgApp.eventCategory.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/event-category/event-category-detail.html',
                    controller: 'EventCategoryDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('eventCategory');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'EventCategory', function($stateParams, EventCategory) {
                    return EventCategory.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'event-category',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('event-category-detail.edit', {
            parent: 'event-category-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/event-category/event-category-dialog.html',
                    controller: 'EventCategoryDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['EventCategory', function(EventCategory) {
                            return EventCategory.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('event-category.new', {
            parent: 'event-category',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/event-category/event-category-dialog.html',
                    controller: 'EventCategoryDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('event-category', null, { reload: 'event-category' });
                }, function() {
                    $state.go('event-category');
                });
            }]
        })
        .state('event-category.edit', {
            parent: 'event-category',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/event-category/event-category-dialog.html',
                    controller: 'EventCategoryDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['EventCategory', function(EventCategory) {
                            return EventCategory.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('event-category', null, { reload: 'event-category' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('event-category.delete', {
            parent: 'event-category',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/event-category/event-category-delete-dialog.html',
                    controller: 'EventCategoryDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['EventCategory', function(EventCategory) {
                            return EventCategory.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('event-category', null, { reload: 'event-category' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
