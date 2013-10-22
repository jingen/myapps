// create the angular module for the application
var apps = angular.module('apps',['ui.router', 'angularFileUpload']);

// configure the router for image resizing and spell checking
apps.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state('/',{
            url: '/',
            templateUrl: '/partial/image_resize'
        }).state('images',{
            url: '/images',
            templateUrl: '/partial/image_resize'
        }).state('word', {
            url: '/word',
            templateUrl: '/partial/spell_check'
        });
});

