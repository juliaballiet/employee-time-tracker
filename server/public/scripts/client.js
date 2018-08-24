let timeApp = angular.module('timeApp', ['ngRoute']);

timeApp.constant("moment", moment);

timeApp.config(function($routeProvider){
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