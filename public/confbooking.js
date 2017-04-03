var app = angular.module('myApp',['angularjs-datetime-picker']);
    app.controller('BookConfController',function($scope, $filter, $http, myFactory) {
       $scope.conflist = {};
      myFactory.getList().success(function(response){
          $scope.conflist = response;
      });

      console.log($scope.conflist);

      /*$http.get('/info').then(function(res){
        $scope.user = res.data;
      });*/
      $scope.action = "saveConf";

      var today = $filter('date')(new Date(), 'yyyy/MM/dd') + " " + $filter('date')(new Date(), 'shortTime');
      $scope.frmDate = today;
      $scope.toDate = today;
      $scope.confMaster = [
        {name : "Select", floor : "0"},
        {name : "SAMEPAGE", floor : "7"},
        {name : "WIKI", floor : "7"},
        {name : "EXCELLENCE", floor : "7"}
    ];

    $scope.ddlconf = $scope.confMaster[0];

    $scope.book = function(){
      //console.log($scope.ddlconf.name);
      //console.log($scope.action);

      var obj = {"frmDate": $scope.frmDate, "toDate":  $scope.toDate, "confName": $scope.ddlconf.name};

      $http.post('/postconf?ui_action='+$scope.action,obj).success(function(response) {
           console.log("success");
            myFactory.getList().success(function(response){
              $scope.conflist = response;
            });
          }).error(function(err){
             console.log("failure")
          });
    }
  });

  app.factory('myFactory', function($http){
    var factoryObj = {};
    factoryObj.getList = function(){
      return $http.get('/postconf?ui_action=getConfList');
    }

    return factoryObj;
    
  });