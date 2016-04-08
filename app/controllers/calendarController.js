myApp.controller("calendarController", function($scope) {
    $scope.date = new Date();
    $scope.firstDayOfMonth = getFirstDayOfMonth($scope);
    //$scope.month = generateMonth();
    $scope.month = [];
    $scope.weekDaysNames = ['sun', 'mon', 'tue', 'wen', 'the', 'fri', 'sat'];
    $scope.daysInMonthsList = [31,28,31,30,31,30,31,31,30,31,30,31];

    var daysInMonthsList = [31,28,31,30,31,30,31,31,30,31,30,31];

    console.log($scope.date);

    function getFirstDayOfMonth () {
        var oneDay = 3600000 * 24;
        var time = $scope.date.getTime();
        var firstDay = time - oneDay * ($scope.date.getDate() - 1);
        return new Date(firstDay).getDay();
    }

    function generateMonth(date) {
        var i = 1,
            daysCount = daysInMonthsList[date.getMonth()];
        for(var week = 0; week <= getMonthWeeks(date); week++ ){

            $scope.month[week] = [];
            for(var day = 0; day < 7; day++){
                if(week === 0){
                    if(day<date.getDay()){
                        $scope.month[week][day] = ' ';
                    } else {
                        $scope.month[week][day] = i;
                        i++;
                    }
                }
                else {
                    if(i <= daysCount){
                        $scope.month[week][day] = i;
                        i++;
                    }
                    else {
                        $scope.month[week][day] = ' ';
                    }
                }
            }
        }
        //return month;
    }

    generateMonth($scope.date);

    console.log(getMonthWeeks());
    console.log($scope.month);

    function getMonthWeeks() {
        return Math.ceil($scope.daysInMonthsList[$scope.date.getMonth()]/7);
    }
});