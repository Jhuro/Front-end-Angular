/* global aplicacionMundial */

(function () {
    var aplicacionMundial = angular.module('aplicacionMundial', []);

    aplicacionMundial.directive('toolbar', function () {
        return{restrict: 'E', templateUrl: 'partials/toolbar.html', controller: function () {
                this.tab = 0;
                this.selectTab = function (setTab) {
                    this.tab = setTab;
                };
                this.isSelected = function (tabParam) {
                    return this.tab === tabParam;
                };
            },
            controllerAs: 'toolbar'};
    });

    aplicacionMundial.directive('competitorInfo', function () {
        return{
            restrict: 'E',
            templateUrl: 'partials/competitor-info.html',
            controller: 'getCompetitors'
        };
    });

    aplicacionMundial.controller("getCompetitors", function ($http, $scope) {
        $http.get('http://localhost:8080/competitors/get').success(function (data, status, headers, config) {
            $scope.competitors = data;
        }).error(function (data, status, headers, config) {
            // log error
        });
    });

    aplicacionMundial.directive('competitorForm', function () {
        return{
            restrict: 'E',
            templateUrl: 'partials/competitor-form.html',
            controller: 'competitorCtrl'};
    });

    aplicacionMundial.controller("competitorCtrl", function ($http, $scope) {
        $scope.addCompetitor = function () {
            console.log('name');
            $http.post('http://localhost:8080/competitors/add',
                    JSON.stringify($scope.competitor)).success(function (data, headers) {
                $scope.competitor = {};
                $scope.toolbar.selectTab(2);
            });
        };
    });

    aplicacionMundial.directive('competitorLogIn', function () {
        return{
            restrict: 'E',
            templateUrl: 'partials/competitor-logIn.html',
            controller: 'logInCtrl'};
    });
    
    aplicacionMundial.controller("logInCtrl", function ($http, $scope) {
        $scope.logIn = function () {
            console.log('name');
            $http.post('http://localhost:8080/competitors/log-in',
                    JSON.stringify($scope.competitor)).success(function (data, headers) {
                $scope.competitor = {};
                $scope.toolbar.selectTab(3);
            });
        };
    });
})();