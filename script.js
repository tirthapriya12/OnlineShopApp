var OnlineShopApp;

var dataURL = "data/data.json";
OnlineShopApp = angular.module('OnlineShop', []);


OnlineShopApp.controller('HomeCtrl', ['$scope', 'FetchData', function ($scope, FetchData) {

    //  $scope.brand=[];

    FetchData.getData().success(function (data) {
        $scope.Product = data.productInfoList;
    }); //gets all the data on page load


    // $scope.$watch('price',function(value){


    // });

}]);

OnlineShopApp.filter('FilterByName', function () {

    return function (items, a) {

        var output = [];

        if (a) {

            angular.forEach(items, function (item) {

                var title=item.productBaseInfo.productAttributes.title.toLowerCase();
                a=a.toLowerCase();
                if (title.indexOf(a) >= 0) {
                    output.push(item);
                }

            });

            return output;

        }
        else {
            return items;
        }



    }



});

OnlineShopApp.filter('FilterByPrice', function () {
    var output = [];
    return function (items, value) {

        output = [];
        switch (value) {

            case '<1000': {

                angular.forEach(items, function (item) {

                    if (item.productBaseInfo.productAttributes.sellingPrice.amount < 1000) {
                        output.push(item);
                    }

                });

                return output;

            }
            case '1000-5000': {
                angular.forEach(items, function (item) {

                    if (item.productBaseInfo.productAttributes.sellingPrice.amount >= 1000 && item.productBaseInfo.productAttributes.sellingPrice.amount <= 5000) {
                        output.push(item);
                    }

                });

                return output;
            }
            case '5000 >': {

                angular.forEach(items, function (item) {

                    if (item.productBaseInfo.productAttributes.sellingPrice.amount > 5000) {
                        output.push(item);
                    }

                });

                return output;

            }

            default: {
                return items;
            }

        }
    }


});


OnlineShopApp.filter('FilterByBrand', function () {

    return function (items, Brand) {
        var output = [], counter = 0,length=0;
        if (typeof (Brand) != 'undefined') {

            for (i in Brand) {
                if (!Brand[i]) {
                    counter++;
                }
                    length++;
            }


            if (counter == length) {
                return items;

            }

            else {
                for (i in Brand) {

                    if (Brand[i]) {
                        angular.forEach(items, function (item) {

                            if (item.productBaseInfo.productAttributes.productBrand.indexOf(i) >= 0) {

                                output.push(item);
                            }

                        });


                    }

                }

                return output;
            }

        }
        else {

            return items;
        }


    }


});