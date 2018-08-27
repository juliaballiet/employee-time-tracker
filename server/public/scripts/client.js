let timeApp = angular.module('timeApp', ['ngRoute', 'ngMaterial'])
.config(function($mdThemingProvider) {
    //defines theme palette
    $mdThemingProvider.definePalette('amazingPaletteName', {
      '50': 'ffebee',
      '100': 'ffcdd2',
      '200': 'ef9a9a',
      '300': '575453',
      '400': 'ef5350',
      '500': '307142',
      '600': '307142',
      '700': 'd32f2f',
      '800': 'c62828',
      '900': 'b71c1c',
      'A100': 'ff8a80',
      'A200': 'ff5252',
      'A400': 'ff1744',
      'A700': 'd50000',
      'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
                                          // on this palette should be dark or light
  
      'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
       '200', '300', '400', 'A100'],
      'contrastLightColors': undefined    // could also specify this if default was 'dark'
    });
  
    $mdThemingProvider.theme('default')
      .primaryPalette('amazingPaletteName')
  
  });
// sets up moment.js
timeApp.constant("moment", moment);
// defines routes
timeApp.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/clockin.html',
        controller: 'ClockinController as cc'
    }).when('/employees', {
        templateUrl: 'views/employees.html',
        controller: 'EmployeeController as ec'
    }).when('/timeclock', {
        templateUrl: 'views/timeclock.html',
        controller: 'TimeclockController as tc'
    }).when('/hours', {
        templateUrl: 'views/total_hours.html',
        controller: 'HoursController as hc'
    }).otherwise({
        template: '<h1>404 page not found</h1>'
    })
})