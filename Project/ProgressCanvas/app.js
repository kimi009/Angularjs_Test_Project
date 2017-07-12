/**
 * Created by kimi on 2017/7/5.
 */
(function (angular) {
    angular.module('directives-load-progress',[])
        .directive('loadProgress',[function () {
            return{
                replace:true,
                compile:function (ele, attr, transclude) {
                    if(ele.length === 1){
                        var node = ele[0];
                        var width = node.getAttribute('progress-width') || '200';
                        var height = node.getAttribute('progress-height') || '200';
                        var canvas = document.createElement('canvas');
                        canvas.setAttribute('width',width);
                        canvas.setAttribute('height',height);
                        canvas.setAttribute('progress-model',node.getAttribute('progress-model'));
                        node.parentNode.replaceChild(canvas,node);
                        var ocwidth = node.getAttribute('progress-outer-circle-width') || '20';
                        var icwidth = node.getAttribute('progress-inner-circle-width') || '5';
                        var ocbColor = node.getAttribute('progress-outer-circle-background-color') || '#666';
                        var ocfColor = node.getAttribute('progress-outer-circle-foreground-color') || '#eee';
                        var iccolor= node.getAttribute('progress-inner-circle-color') || '#666';
                        var lbcolor = node.getAttribute('progress-label-color') || '#eee';
                        var ocradius = node.getAttribute('progress-outer-circle-radius') || '80';
                        var icradius = node.getAttribute('progress-inner-circle-radius') || '50';
                        var lbfont = node.getAttribute('progress-label-font') || '30pt Arial';
                        return{
                            pre:function (scope, ele, attr, ctrl) {
                                var expression = canvas.getAttribute('progress-model');
                                scope.$watch(expression,function (newVal, oldVal) {
                                    var ctx = canvas.getContext('2d');
                                    ctx.clearRect(0,0,width,height);
                                    var x = width /2 ;
                                    var y  = height /2;
                                    ctx.beginPath();
                                    ctx.arc(x,y,parseInt(ocradius),0,Math.PI * 2,false);
                                    ctx.lineWidth = parseInt(ocwidth);
                                    ctx.strokeStyle = ocbColor;
                                    ctx.stroke();
                                    ctx.beginPath();
                                    ctx.arc(x,y,parseInt(icradius),0,Math.PI * 2,false);
                                    ctx.lineWidth = parseInt(icwidth);
                                    ctx.strokeStyle = iccolor;
                                    ctx.stroke();
                                    ctx.font = lbfont;
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline= 'middle';
                                    ctx.fillStyle = lbcolor;
                                    ctx.fillText(newVal.label,x,y);
                                    var startAngle = -(Math.PI / 2);
                                    var endAngle = ((Math.PI * 2) * newVal.precentage) - (Math.PI / 2);
                                    var anticlockwise = false;
                                    ctx.beginPath();
                                    ctx.arc(x,y,parseInt(icradius),startAngle,endAngle,anticlockwise);
                                    ctx.lineWidth = parseInt(icwidth);
                                    ctx.strokeStyle = ocfColor;
                                    ctx.stroke();
                                },true);
                            }
                        };

                    }
                }
            }
        }]);
    angular.module('progress',['directives-load-progress'])
        .controller('ctrl_progress',['$scope','$interval',function ($scope,$interval) {
            $scope.ProgressValue = {
                label:0,
                percentage:0.00
            };
            $scope.$watch('ProgressValue',function (newVal) {
                newVal.percentage = newVal.label / 100;
            },true);
            $scope.start = function () {
                var i = 0;
                var n = $interval(function () {
                    i++;
                    $scope.ProgressValue.label = i;
                    if(i===100){
                        $interval.cancel(n);
                    }
                },500);
            };
        }]);
})(angular);