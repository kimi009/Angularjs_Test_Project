**Angularjs Study Note**
1. 有关样式根据不同变量值显示
    <div ng-class="{'red':true,'green':false}[blnfocus]'></div>
    blnfocus 是控制器中的变量。
2. 控制元素的显示和隐藏 
    ng-show     ng-hide     ng-switch
    前两个直接控制，
    ng-show = 'true' ng-hide = 'false' 元素显示，反之隐藏
    ng-switch 该指令是显示匹配成功的元素. 一般结合 ng-switch-when  ng-switch-defalut 使用
    example: 
        <ul ng-switch on = {{switch}}>
            <li ng-switch-when = '1'>...</li>
        </ul>
3. 表单控件
    3.1 控件交互值：
        $pristine 表示表单或控件内容是否输入过
        $dirty 表示表单控件内容是否已经输入过
        $valid 表示表单是否验证通过
        $invalid 表单是否未验证过
        $error  表单或控件内容验证时的错误提示信息
        
        前四个都是返回布尔值，最后一个是对象
        
 4. $Injector 
        var injector = angular.injector(['module','controller']);
        injector.invoke(fun);
5.指令：
    5.1 replace 是否替换指令标签
    5.2 transclude 指令里面的transclude 一般和标签中的ng-transclude配合使用
        可以将调用指令后的元素内容替换为指令中的模板内容，如果模板中的内容没有元素标签，而是纯文本
        那么替换时则会自动添加一个span标签，不仅仅是内容的替换，它们之间还可以通过变量来传递数据
    5.3  directive scope
        scope:true  子作用域是独立的作用域，只有初始化的时候会获取父作用域属性值，之后彻底脱离父子关系
        scope:@  跟scope:true差不多，唯一不同的是没有脱离父子关系，值还是父-->子 不能子--> 父
        scope:=   双向绑定
        scope:&   可以在子作用域中调用父作用域的方法。
        
     5.4  link 函数中可以用scope.$apply(function(){})来重刷页面
     5.5  require 用于描述和父作用域通信的方式
            ^  表示向外层寻找指定名称的指令
            ？ 表示即使没有找到也不会出现异常，
            require 一般和父作用域的controller配合
6. 解决花括号绑定闪烁问题： ng-cloak
7. Angularjs 添加元素方式
    var html = "<div ng-click = 'log()'>{{hello}}</div>";
    var template = angular.element(html);
    var newHtml = $compile(template)($scope);
    angular.element(document.getElementById(''')).append(newHtml);
        