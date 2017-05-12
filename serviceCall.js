
OnlineShopApp.factory('FetchData', ['$http', function ($http) {
    return {
        getData: function () {
            return $http.get(dataURL);
        }

    };
}]);



OnlineShopApp.factory('CatchItem', function () {

    var item = {};

    return {
        setItem: function (obj) {
            item = obj;

        },
        getThisItem: function (itemid, Data) {



            for (var i = 0; i < Data.length; i++) {
                if (Data[i].productBaseInfo.productAttributes.productUrl.indexOf(itemid) >= 0) {
                    item = Data[i];
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
            var count = 1,flag=0;
            if (Items.length == 0) {
                Items.push(object);
            }
            else {


                for (i in Items) {

                    if (Items[i].offset.split(':')[2] == object.offset.split(':')[2]) {

                        if (Items[i].count) {
                            count = Items[i].count;
                        }
                        count++;

                        Items[i].count = count;
                        flag = 1;
                        console.log(Items);
                        break;

                    }
                }

                if(flag!=1)
                {
                         Items.push(object);
                }
               





            }

            //Items.push(object);

            return true;
        }


    };

});


