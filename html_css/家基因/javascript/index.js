$(function(){

    /*首页*/
$("#index").css({"height":$(window).height()});
$(window).resize(function(){
    $("#index").css({"height":$(window).height()});
});
$(".indexBgAni .pic-home,.indexBgAni .pic-people,.indexBgAni .pic-jy,.indexBgAni .basic").addClass("a");  
    
//表格增加行
$(".add-rows").click(function(){
     var num = $(".report-manage-table").find("tbody").find("tr").size()+1;
     if(num.toString().length==1){
         num = '0'+num;   
     }
     var dom = '<tr><td>'+num+'</td><td><input name="add" value="" placeholder="请输入"></td><td><a href="javascript:;" class="sub">确定</a></td></tr>';
    $(".report-manage-table").find("tbody").append(dom);
});
    
    
 //选项卡
$(".tabs li").click(function(){
    var index = $(this).index();
    $(this).addClass("current").siblings().removeClass("current");
    $(".tabs-cont").eq(index).addClass("current").siblings(".tabs-cont").removeClass("current");
});    
    
//隐私保护下拉
$(".sel-d .btn").click(function(){
    $(this).siblings(".menu").toggleClass("current");
});
$(".sel-d").find(".menu").find("i").click(function(){
    var data = $(this).attr("data");
    var text = $(this).text();
    $(this).parentsUntil(".sel-d").siblings("input.info-protect").val(data);
    $(this).parentsUntil(".sel-d").siblings(".btn").text(text);
    $(this).parent(".menu").removeClass("current");
});
    
  //验证码倒计时
$(".getCode").click(function(e){
        e.preventDefault();
        var timer = 60;    
        var thisText = $(this).text();
        var self = $(this);
         showTime = setInterval(function() {
                    if (timer == 1) {
                        self.text(thisText).removeAttr("disabled").removeClass("disabled");
                        clearInterval(showTime);
                        timer = 1;
                    } else {
                        self.text("重新发送("+(timer - 1)+")").addClass("disabled").attr("disabled", true);
                        timer--;
                    }
        },1000);
});    

//下单数量    
$(".num-add").click(function(){
      var numResult = Number($(".num-result").val());
      numResult++;
      $(".num-result").val(numResult);
});    
$(".num-minu").click(function(){
      var numResult = Number($(".num-result").val());
      if(numResult === 0) return;
      numResult --;
      $(".num-result").val(numResult);
});        
    

//场景
$(".section .center .view").click(function(){
    $(".section").find(".txt").toggleClass("current");
});    
    
//场景光效
(function($){
    
     var num = 3;
     $(".example-cont .circle").eq(num).addClass("current");
     function clock(){
        if(num!=1){
            $(".example-cont .circle").eq(num).addClass("current").siblings().removeClass("current");
            num --;
        }else{
            $(".example-cont .circle").eq(num).addClass("current").siblings().removeClass("current");
            num = 3;
        }
     }
    
    setInterval(clock,1000);
    
})(jQuery);   
    
    

    
    
    
    
    
    
    
});