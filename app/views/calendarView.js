'use strict';

angular.module('calendarView', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/calendarView', {
            templateUrl: 'templates/ngCalendar.html',
            controller: 'calendarController'
        });
    }]);