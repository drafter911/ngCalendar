myApp.directive("ngcalendar", function() {
    return {
        restrict: "E",
        controller: 'calendarController',
        templateUrl: "templates/ngCalendar.html",
        scope: {
            selected: "="
        },
        link: function($scope) {

        }
    };
});