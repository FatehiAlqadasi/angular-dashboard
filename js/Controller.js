
var app =  angular.module('report', ['googlechart']);

app.controller('Controller', function($scope, $http, $location) {

    $scope.issues = new Data();
    $scope.codeIssues = new Data();
    $scope.closedIssues = new Data();
    $scope.otherIssues = new Data();

    $scope.chart = new EasyChart({
        'options': {
            'PieChart': {
                title: 'Chart',
                displayExactValues: true,
                width: 400,
                height: 200,
                is3D: true,
                chartArea: {left: 10, top: 10, bottom: 0, height: '100%'}
            },
            'GeoChart': {
                is3D: true,
                legend: {textStyle: {color: 'blue', fontSize: 16}}
            },
            'LineChart': {
                curveType: 'function'
            }
        },
        'parameters':{
            'keys':[
                ['inAccept', 'PieChart', $scope.issues],
                ['inClosed', 'PieChart', $scope.issues],
                ['byCountry', 'GeoChart', $scope.issues],
                ['inService', 'PieChart', $scope.issues],
                ['inPending', 'PieChart', $scope.issues],
                ['bySolution', 'PieChart', $scope.otherIssues],
                ['inAcceptance', 'PieChart', $scope.issues],
                ['byCodeOthers', 'PieChart', $scope.closedIssues],
                ['byApplication', 'PieChart', $scope.codeIssues],
                ['byVersionA', 'PieChart', $scope.codeIssues],
                ['byVersionO', 'PieChart', $scope.otherIssues],
                ['closedAndOpened','LineChart',$scope.issues],
                ['stockDown','LineChart',$scope.issues]
            ]
        }
    });

    $scope.list = [];
    $scope.header = $scope.issues.getHeader();

    $scope.update = function() {

        var uri = './data.json';

        $http.get(uri).success(function(data) {

            $scope.list = data;
            $scope.chart.draw($scope);
        });
    };

    $scope.update();

    $scope.refresh = function(index) {
        if ($scope.filtered.length == index ) {
            var data = $scope.filtered;

            $scope.issues.assigne(data);
            $scope.closedIssues.assigne($scope.issues.getClosedIssues());
            $scope.codeIssues.assigne($scope.closedIssues.getCodeIssues());
            $scope.otherIssues.assigne($scope.closedIssues.getOthersIssues());

            $scope.chart.update($scope);
        }
    };
});
