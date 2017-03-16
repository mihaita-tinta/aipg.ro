(function() {
    'use strict';

    angular
        .module('aipgApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('entry-category', {
            parent: 'entity',
            url: '/entry-category',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'aipgApp.entryCategory.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/entry-category/entry-categories.html',
                    controller: 'EntryCategoryController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('entryCategory');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('entry-category-detail', {
            parent: 'entry-category',
            url: '/entry-category/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'aipgApp.entryCategory.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/entry-category/entry-category-detail.html',
                    controller: 'EntryCategoryDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('entryCategory');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'EntryCategory', function($stateParams, EntryCategory) {
                    return EntryCategory.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'entry-category',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('entry-category-detail.edit', {
            parent: 'entry-category-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entry-category/entry-category-dialog.html',
                    controller: 'EntryCategoryDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['EntryCategory', function(EntryCategory) {
                            return EntryCategory.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('entry-category.new', {
            parent: 'entry-category',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entry-category/entry-category-dialog.html',
                    controller: 'EntryCategoryDialogController',
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
                    $state.go('entry-category', null, { reload: 'entry-category' });
                }, function() {
                    $state.go('entry-category');
                });
            }]
        })
        .state('entry-category.edit', {
            parent: 'entry-category',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entry-category/entry-category-dialog.html',
                    controller: 'EntryCategoryDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['EntryCategory', function(EntryCategory) {
                            return EntryCategory.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('entry-category', null, { reload: 'entry-category' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('entry-category.delete', {
            parent: 'entry-category',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/entry-category/entry-category-delete-dialog.html',
                    controller: 'EntryCategoryDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['EntryCategory', function(EntryCategory) {
                            return EntryCategory.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('entry-category', null, { reload: 'entry-category' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
