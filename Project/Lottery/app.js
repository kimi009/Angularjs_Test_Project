/**
 * Created by kimi on 2017/7/5.
 */
(function (angular) {
    angular.module('lottery',[])
        .controller('ctrl_lottery',['$scope','$timeout',function ($scope, $timeout) {
            $scope.items = [
                {id : 1, name : '欧洲豪华游',status:0},
                {id : 2, name : 'Mac电脑',status:0},
                {id : 3, name : 'iPhone6',status:0},
                {id : 4, name : '时尚山地车',status:0},
                {id : 5, name : '高清数字电视',status:0},
                {id : 6, name : '100充值卡',status:0},
                {id : 7, name : '谢谢参与',status:0}
            ];
            $scope.result = '奖品为空';
            $scope.$$ = function (id) {
                return document.getElementById(id);
            };
            $scope.showhide = function (pre, nex) {
                pre = 'step'+ pre;
                nex = 'step'+ nex;
                $scope.$$(pre).style.display = 'none';
                $scope.$$(nex).style.display = 'block';
            };
            $scope.start1 = function () {
              $scope.showhide(1,2);
              var circle = 2;
              var selkey = Math.floor(Math.random() * $scope.items.length);
              var next = function (key) {
                  $scope.items[key].status = true;
                  if((key - 1) >= 0){
                      $scope.items[key - 1].status = false;
                  }
                  if(key === 0){
                      $scope.items[$scope.items.length - 1].status = false;
                  }

                      var timer = $timeout(function () {
                          if(circle <= 0 && selkey == key){
                              $scope.showhide(2,3);
                              $scope.result = $scope.items[key].name;
                              return;
                          }
                          if($scope.items.length == key +1){
                              circle--;
                          }
                          if($scope.items[key + 1]){
                              next(key + 1);
                          }else{
                              next(0);
                          }
                      },100);

              };
              next(0);
            };

            //固定奖品

            $scope.start = function () {
                $scope.showhide(1,2);
                var circle =  Math.floor((Math.random() * 15) + 4);
                console.log(circle);
                angular.forEach($scope.items,function (item) {
                    item.status =false;
                });
                var next = function (key) {
                    $scope.items[key].status = true;
                    if((key - 1) >= 0){
                        $scope.items[key - 1].status = false;
                    }
                    if(key === 0){
                        $scope.items[$scope.items.length - 1].status = false;
                    }
                    var timer = $timeout(function () {
                        if(key > 4){
                           if(circle <= 0){
                               $scope.showhide(2,3);
                               $scope.result = $scope.items[key].name;
                           }else{
                               circle--;
                               if($scope.items[key + 1]){
                                   next(key + 1);
                               }else{
                                   next(0);
                               }
                           }
                        }else{
                            next(key  + 1);
                            circle--;
                        }
                    },100);
                };
                next(0);
            };

            $scope.reset = function () {
                $scope.showhide(3,1);
            };

            $scope.edit = function () {
                $scope.showhide(3,4);
            };

            $scope.add = function () {
                var last_id = lastId();
                $scope.items.push({id:last_id,name:$scope.name,status:0});
            };
            $scope.del = function (id) {
                angular.forEach($scope.items,function (value, key) {
                    if(id == value.id){
                        $scope.items.splice(key,1);
                    }
                })
            };

            $scope.return = function () {
                $scope.showhide(4,3);
            };

            function lastId() {
                var id = 0;
                angular.forEach($scope.items,function (value, key) {
                    if(id < value.id){
                        id = value.id;
                    }
                });
                return ++id;
            }
        }])
})(angular);