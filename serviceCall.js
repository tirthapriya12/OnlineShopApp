
OnlineShopApp.service('FetchData', ['$http', function ($http) {
    return {
        getData: function () {
            return $http.get(dataURL);
        }
    };
}]);
// function FetchData($http,$scope){


//        $http.get(dataURL).success(function (data) {

//                     $scope.Product=data.productInfoList;

//                     console.log($scope.Product);
        

//     }).error(function (err) {
//         $scope.errorMessage = "Cannot Fetch Data";
//     });



// }

