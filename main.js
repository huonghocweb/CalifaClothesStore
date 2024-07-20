var app=angular.module("myApp",["ngRoute"]);
app.controller("myController",function($scope,$http,$routeParams){
    $scope.products=[]
    $scope.loadData=function(){
        $http.get(" http://localhost:3000/products")
        .then(res=>{
            $scope.products=res.data        
        })
    }
    $scope.loadData()
    $scope.x="";
    $scope.sortBy=function(x){
        $scope.prop=x;
    }
    $scope.boloc="";
    $scope.loc=function(boloc){
        $scope.y=boloc;
    }
   
})
app.filter('even', function() {
    return function(input) {
    var evenNumbers = [];
    for (var i = 0; i < input.length; i++) {
        if (input[i].price <= 200) {
        evenNumbers.push(input[i]);
        }
    }
    return evenNumbers;
    };
    });