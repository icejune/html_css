$(function(){
    

//页面滚动左侧固定 
    if($('.container-list').length == 1){
           var containerList = $('.container-list').offset().top;
           $(window).scroll(function(){
               var scrollTop = $(this).scrollTop();
               if(scrollTop>=containerList){
                   $('.container-list').css({position:'fixed',"top":0});
               }else{
                   $('.container-list').css({position:'relative'});
               }
           }); 
    }

    
//菜单折叠    
    $('.menu-list').click(function(){
        $(this).find('.menu-child').slideToggle(200);
    });
    
// 选项卡   
$(".tabs span").click(function(){
    var index = $(this).index();
    $(this).addClass("current").siblings().removeClass("current");
    $(".tabs-cont").eq(index).addClass("current").siblings().removeClass("current");
});
    
    
//加载更多
    $(".load-article").click(function(){
        var index = $(this).parent(".tabs-cont").index() - 1;
        $.ajax({
            url:'demo.html',
            success:function(data){
                $(".tabs-cont").eq(index).append(data);
            },
            error:function(){
                alert("请求失败"+index);
            }
        });
    });
    
// 课程状态   
var classStatus = {
    begin : '<img class="abs" src="images/class-begin.png">',
    hot : '<img class="abs" src="images/class-hot.png">',
    over : '<img class="abs" src="images/class-over.png">'
}
$(".page-class").find("a.rel").each(function(){
    var status = $(this).attr("data-status");
    $(this).append(classStatus[status]);
}); 
    
    
 
    
    
    
    
    
    
    
    
    
    
});