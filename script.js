var OnlineShopApp;

var dataURL = "data/data.json";
OnlineShopApp = angular.module('OnlineShop', ['ui.router']);


OnlineShopApp.controller('HomeCtrl', ['$scope', 'FetchData', 'CatchItem', 'Cart', function ($scope, FetchData, CatchItem, Cart) {

    
        $scope.CartItems = [];


    FetchData.getData().success(function (data) {
        $scope.Product = data.productInfoList;

    }); //gets all the data on page load


   

    $scope.sendItem = function (item) {

        // $scope.itemId= obj

        return {
            itemid: item.productBaseInfo.productAttributes.productUrl.split('?pid=')[1].split('&')[0],
            title: item.productBaseInfo.productAttributes.title
        };

    };  //sets item name and productid in urlparams 



    $scope.getCount = function () {


        return Cart.getItemCount();
    } //shows item count in cart

    
    // $scope.getCartItems = function () {

    //     var C_items = [];

    //    var a = Cart.getItems();
    //    for(i in a)
    //    {
    //        C_items.push(a[i]);
    //    }

    //     for (var i = 0; i < C_items.length; i++) {
    //         var count=1;
    //         for (var j = i + 1; j < C_items.length; j++) {

    //                 if(C_items[i].offset.split(':')[2]==C_items[j].offset.split(':')[2])
    //                 {   
    //                     count++;
    //                     C_items[j].count=count;
    //                     $scope.CartItems[i]=C_items[j];
    //                     C_items.splice(j,1);
    //                 }
    //                 else{
    //                      C_items[j].count=count;
    //                     $scope.CartItems[i]=C_items[j];
    //                 }
                    
    //         }
    //         console.log($scope.CartItems);
            

    //     }


    //     return $scope.CartItems;
    // };//show items in cart

    $scope.getCartItems = function () {

                 $scope.CartItems=Cart.getItems();

                 return $scope.CartItems;
                 
    };



}]);

OnlineShopApp.filter('FilterByName', function () {

    return function (items, a) {

        var output = [];

        if (a) {

            angular.forEach(items, function (item) {

                var title = item.productBaseInfo.productAttributes.title.toLowerCase();
                a = a.toLowerCase();
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
        var output = [], counter = 0, length = 0;
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

OnlineShopApp.controller('DescViewCtrl', ['$scope', 'CatchItem', 'Cart', '$stateParams', 'FetchData', function ($scope, CatchItem, Cart, $stateParams, FetchData) {



    FetchData.getData().success(function (data) {

        $scope.Product = data.productInfoList;

    });

    $scope.item = CatchItem.getThisItem($stateParams.itemid, $scope.Product); //get the required item for corresponding productid


    $scope.addToCart = function (obj) {

        Cart.setItem(obj);


    };




}]);

OnlineShopApp.config(function ($stateProvider, $urlRouterProvider) {
    //console.log($scope.Product.productBaseInfo.productAttributes.productUrl.split('?pid=')[1]);
    var home = {
        name: 'home',
        url: '/home',
        constroller: 'HomeCtrl',



    };

    var desc = {

        name: 'desc',
        url: '/desc/:itemid/:title',
        templateUrl: 'product-desc.html',
        controller: 'DescViewCtrl',



    };

    $stateProvider.state(desc);
    $stateProvider.state(home);
    $urlRouterProvider.otherwise("/home");

});

OnlineShopApp.directive('checkout', function () {
    return {
        restrict: 'E',
        transclude: 'true',
        templateUrl: 'checkout.html'
    };
});