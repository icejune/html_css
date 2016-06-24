;(function($, window, document,undefined) {
    
function Circle(ele,opts){
    this.Ele = ele;
    this.default = {
        cir : [325,250,200,150,100],
        highlight:false,
        data:{}
    };
    this.opts = $.extend({},this.default,opts);
    this.init();
}    
 

Circle.prototype.pop = function(){
     var self = this;
      this.Ele.on('mouseover','img',function(e){
          e.stopPropagation();
            var info  =  $(this).attr("data-title").split(",");
            var dom = '<div class="abs cirPop"><i class="pop-arrow"></i><p>编号：'+info[2]+'</p><p><span>姓：'+info[1]+'</span><span>年龄：'+info[1]+'</span></p></div>';
           $("body").append(dom);
              $(this).mousemove(function(e){
                var x = e.pageX+25;
                var y = e.pageY;
                  $(".cirPop").css({
                      "z-index":10,
                      left:x,
                      top:y
                  });
              });
          if(self.opts.highlight === true){
              var n = $(this).attr("data-num");
              $(".example-table").find("tr").each(function(){
                  var tn = $(this).attr("data-num");
                  if(n==tn){
                      $(this).addClass("current").siblings().removeClass("current");
                  }
              });
          }
          
      })
      this.Ele.on('mouseout','img',function(){
       $(".cirPop").remove();
      })
}    
    
    
Circle.prototype.init = function(){
    var self = this;
    $.each(this.opts.cir,function(key,val){
         var size = val * 2;
         self.Ele.append('<div class="circle abs" style="margin-top: -'+val+'px;margin-left: -'+val+'px;width:'+size+'px;height: '+size+'px;"></div>');
    });
    this.Ele.find(".circle").first().addClass("a");
}    


 Circle.prototype.push = function(){
     var self = this;
     $.each(this.opts.data,function(k,y){
        if(y.length>0){
           var index = k.substring(1);
            for (var i=0;i<y.length;i++){
                var random = Math.random()*360;
                var scale ='transform:scale('+y[i].scale+');-webkit-transform:scale('+y[i].scale+');-moz-transform:scale('+y[i].scale+');-ms-transform:scale('+y[i].scale+');-o-transform:scale('+y[i].scale+');transform:scale('+y[i].scale+');';
                var style = '<img class="abs" style="left:'+y[i].pos[0]+'px;top:'+y[i].pos[1]+'px;'+scale+'" data-title="'+y[i].name+','+y[i].year+','+y[i].number+'" data-num="'+y[i].number+'" src="'+y[i].photo+'">';
                self.Ele.find(".makeCir-cont").append(style);
            }
        }
     });
     
     this.pop();
 }   

    
$.fn.makeCir = function(opts){
    var circle = new Circle(this,opts);
    return circle.push();
}      
    
    
    
})(jQuery, window, document);

