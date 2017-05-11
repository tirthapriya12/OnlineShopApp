
OnlineShopApp.factory('FetchData', ['$http', function ($http) {
    return {
        getData: function () {
            return $http.get(dataURL);
        }

    };
}]);



OnlineShopApp.factory('CatchItem',  function () {

    var item = {};

    return {
        setItem: function (obj) {
            item = obj;

        },
        getThisItem: function (itemid,Data) {


           
                 for (var i = 0; i < Data.length; i++) {
                if (Data[i].productBaseInfo.productAttributes.productUrl.indexOf(itemid) >= 0) {
                    item=Data[i];
                    console.log(item);
                }

            }
            return item;
            }//get data from database

           
        };

    

});

OnlineShopApp.factory('Cart', function () {

    var Items = [];
    return {

        getItems: function () {

            return Items;
        },
        getItemCount: function () {

            return Items.length;
        },
        setItem: function (object) {

            Items.push(object);

            return true;
        }


    };

});


