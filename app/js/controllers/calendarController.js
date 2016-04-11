myApp.controller("calendarController", function ($scope) {
    $scope.date = new Date();
    $scope.firstDayOfMonth = getFirstDayOfMonth();
    $scope.month = [];
    $scope.currentMonth = 0;
    $scope.currentYear = 1970;
    $scope.isCurrentDay = $scope.date.getDate();
    $scope.monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    $scope.weekDaysNames = ['mon', 'tue', 'wen', 'the', 'fri', 'sat', 'sun'];
    $scope.daysInMonthsList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    $scope.checkIfWasActive = function(day) {
        return localStorage.getItem(toLocalData(day));
    };

    $scope.setSelected = function (day) {
        if(!($scope.currentMonth < new Date().getMonth() || $scope.currentYear < new Date().getFullYear() || day < new Date().getDate())){
            localStorage.setItem(toLocalData(day), JSON.stringify(toLocalData(day)));
            return false;
        }
    };

    $scope.highLightCurrentDay = function (day) {
        return (day === new Date().getDate())
            && (new Date().getFullYear() === $scope.currentYear)
            && (new Date().getMonth() === $scope.currentMonth);
    };

    $scope.getMonthName = function() {
        return $scope.monthNames[$scope.currentMonth];
    };

    $scope.getPrevMonth = function () {
        generateMonth(new Date($scope.date.setMonth($scope.date.getMonth() - 1)));
    };
    $scope.getNextMonth = function () {
        generateMonth(new Date($scope.date.setMonth($scope.date.getMonth() + 1)));
    };


    function getFirstDayOfMonth() {
        var oneDay = 3600000 * 24,
            time = $scope.date.getTime(),
            firstDay = time - oneDay * ($scope.date.getDate() - 1);
        return new Date(firstDay).getUTCDay();
    }

    function generateMonth(date) {
        var i = 1,
            daysCount = $scope.daysInMonthsList[date.getMonth()];

        $scope.currentMonth = date.getMonth();
        $scope.currentYear = date.getFullYear();

        leapYear($scope.currentYear) ? $scope.daysInMonthsList[1] = 29 : $scope.daysInMonthsList[1] = 28;

        for (var week = 0; week <= getMonthWeeks(date); week++) {

            $scope.month[week] = [];
            for (var day = 0; day < 7; day++) {
                if (week === 0) {
                    if (day < getFirstDayOfMonth()) {
                        $scope.month[week][day] = ' ';
                    } else {
                        $scope.month[week][day] = i;
                        i++;
                    }
                }
                else {
                    if (i <= daysCount) {
                        $scope.month[week][day] = i;
                        i++;
                    }
                    else {
                        $scope.month[week][day] = ' ';
                    }
                }
            }
        }
    }

    generateMonth($scope.date);

    function getMonthWeeks() {
        return Math.ceil($scope.daysInMonthsList[$scope.date.getMonth()] / 7);
    }

    function leapYear(year) {
        return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
    }

    function toLocalData(day) {
       return JSON.stringify(day.toString() + $scope.currentMonth.toString() + $scope.currentYear.toString());
    }
});