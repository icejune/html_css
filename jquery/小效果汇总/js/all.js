//block_1:表格隔行换色；移上去变色。
$(block_1);
function block_1(){
	$(".block_1 tr:even").addClass("alt");
	$(".block_1 tr").mouseover(function(){
		$(this).addClass("over");})
				   .mouseout(function(){
		$(this).removeClass("over");})
}
//block_2://让同辈元素同时应用一个样式
$(block_2);
function block_2(){
	//在谷歌、火狐和IE8以上浏览器中，获取的颜色值是RGB形式，例如rgb(255,255,0),以下代码是将其进行转换
	//详解：http://www.softwhy.com/forum.php?mod=viewthread&tid=8774
	$.fn.getColor = function(){
		var rgb = $(this).css('color');
		if(rgb >= 0) return rgb;//如果是一个hex值则直接返回
		else{
			//通过match()函数可以将颜色值字符串生成一个数组，这个数组中有4个元素，以rgb(102, 0, 255)作为例子，
			//第一个元素是整个颜色值字符串rgb(102, 0, 255)，第二个数组元素是102，第三个是0，第四个是255。
			rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
			function hex(x){
				return ("0" + parseInt(x).toString(16)).slice(-2);
			}
			rgb= "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
		}
		return rgb;
	}
	var h=$(".block_2 h4"),
		color=h.getColor();
	 h.siblings().css('color',color);
	 $(".block_2 p").prev().css('background','#f7f7f7');
}
//block_3:获取对象宽度
$(block_3);
function block_3(){
	$("#testDiv").click(function(){
		alert("attr(\"width\"):" + $("#testDiv").attr("width")); //attr("width"):200
		alert("css(\"width\"):" + $("#testDiv").css("width")); //css("width"):200px
		alert("width():" + $("#testDiv").width()); //width():200
		alert("style.width:" + $("#testDiv")[0].style.width);//style.width:200px
		alert($(".block_3").height());//30
	})
	$("#click_me").mousedown(function(e){
		var what=e.which;
		if(what==1)
		alert("哈哈，你是用左键点击我的！");
		if(what==2)
		alert("哈哈，你是用滚动轮点击我的！");
		if(what==3)
		alert("哈哈，你是用右键点击我的！");
	})
}
//block_4:两种DOM的写法
$(block_4);
function block_4(){
	//DOM方法1
	var $rule=$("#rule");
	var rule=$rule[0];
	$rule.click(function(){
		if(rule.checked){
			alert("感谢您的支持，您可以继续操作！");
		}
	});
	//DOM方法2
	$("#rule").click(function(){
		if(this.checked){
			alert("感谢您的支持，您可以继续操作！");
		}
	})
	//以下是Jquery的写法：
	var $rule=$("#rule");
	$rule.click(function(){
		if($rule.is(":checked")){
			alert("感谢您的支持，您可以继续操作！")
		}
	})
	//克隆用法：
	$(".block_4 button").click(function(){
	  $(this).clone(true).insertAfter(this);
	}); 
	$(".block_4 .button").wrapInner("<span></span>").each(function(){
		$(".block_4 .button span").css("opacity","0").hover(function(){
			 $(this).stop().fadeTo(650, 1); 
		},function(){
			$(this).stop().fadeTo(650, 0); 
		})
	});
}
//block_5
$(block_5);
function block_5(){
	var $category=$(".block_5 ul li:gt(5):not(:last)");
		$category.hide();
	var $con=$(".block_5 ul li").filter(":contains('苹果'),:contains('夏普')");
	$("#view_all").click(function(){
		if($category.is(":visible")){
			$category.hide();
			$("#view_all").removeClass("btn_current").val("显示全部品牌");
			$con.removeClass("light_color");
		}
		else{
			$category.show();
			$("#view_all").addClass("btn_current").val("精简全部品牌");
			$con.addClass("light_color");
		}
	})
}
//block_6
$(block_6);
function block_6(){
	$(".block_6 dl dd").css("display","none");
	$(".block_6 dl dt a").click(		
		function(){
			if($(this).hasClass("current")){
				$(this).removeClass("current").parent().siblings().hide();return false;
			}
			else{
				$(this).addClass("current").parent().siblings().show();return false;
			}
		}
	)
}

//block_7
$(block_7);
function block_7(){
	var x=10,
		y=10;
	$(".tooltip").mouseover(function(e){
		this.myTitle=this.title;
		this.title="";
		var tooltip="<div id='tooltip'>"+this.myTitle+"</div>";
		$(".block_7").append(tooltip);
		$("#tooltip").css({"top":(e.pageY+y)+"px","left":(e.pageX+x)+"px"}).show("fast");
	}).mouseout(function(){
		this.title=this.myTitle;
		$("#tooltip").remove();
	}).mousemove(function(e){
		$("#tooltip").css({"top":(e.pageY+y)+"px","left":(e.pageX+x)+"px"}).show("fast");
	});
	$(".imgtip").mouseover(function(e){
		this.myTitle=this.title;
		this.title="";
		var imgtitle=this.myTitle?""+this.myTitle:"";
		var imgtip="<div id='imgtip'><img src='"+this.src+"'/><p>"+imgtitle+"</p></div>";
		$(".block_7").append(imgtip);
		$("#imgtip").css({"top":(e.pageY+y)+"px","left":(e.pageX+x)+"px"}).show("fast");
	}).mouseout(function(){
		this.title=this.myTitle;
		$("#imgtip").remove();
	}).mousemove(function(e){
		$("#imgtip").css({"top":(e.pageY+y)+"px","left":(e.pageX+x)+"px"}).show("fast");
	})

	function common(name){
		this.name = name;
	}
	function move(){
		$("#imgtip").css({"top":(e.pageY+y)+"px","left":(e.pageX+x)+"px"}).show("fast");
	}
	common.prototype.move=move;
}
//block_8
$(block_8);
function block_8(){
	var x=10,
		y=10,
		count=1;	
	$(".block_8 h3").click(		
		function(){
			count++;
			if(count % 2 == 0){
				$(".block_8 .contain").slideUp(1000);
			}
			else{
				$(".block_8 .contain").slideDown(1000);
			}
		}
	)
	var $moving =$(".block_8 .moving");
	$moving.hide();
	$(".block_8 .click").bind("click",function(){
		$moving.show();
		$moving.css("opacity","0.5");
		if(!$moving.is(":animated")){
		$moving.animate({left:"100px",height:"70px",opacity:"1"},"slow")
			   .animate({top:"100px",width:"150px"},"slow",function(){
						$(this).css("border","5px solid #000");})
			   .fadeOut(2000)
			   .css({"left":"auto","width":"100px","height":"35px","top":"auto","borderWidth":"1px"})
				}			   
			   //不知道如何做到第二次点击时出现完整动画。。。。。。？？？？？
		return false;
	})
}
//block_9
$(block_9);
function block_9(){
	var page=1;
	var i=4;
	var $check_list_li=$("ul.check_list li")
	var $check_a=$("ul.check_list li a");
	var $arrow_left=$(".block_9 .jump .jump_arrow a:last");
	var $arrow_right=$(".block_9 .jump .jump_arrow a:first");
	var $parent=$arrow_left.parents("div.block_9");
	var $v_show=$parent.find("div.box_contain ul");
	var $v_content=$parent.find("div.box_contain");
	var v_width=$v_content.width();
	var v_show_len=$v_show.find("li").length;
	var page_count=Math.ceil(v_show_len/i);
	$v_show.find("img").attr("title","我是第"+(page_count)+"版");//不知道如何判断图片属于第几版。。。。？？？？？
	$check_list_li.eq(0).addClass("current").siblings().removeClass("current");
	$check_a.click(function(){
		$(this).parent().addClass("current").siblings().removeClass("current");
		if(!$v_show.is(":animated")){
			if(page==page_count){
				$v_show.animate({left:"0px"},"slow");
				page=1;
			}else{
				$v_show.animate({left:"-="+v_width},"slow");
				page++;
		}}
		return false;
	})
	$(".block_9 .jump .jump_arrow a:first").click(function(){
		if(!$v_show.is(":animated")){
			if(page==page_count){
				$v_show.animate({left:"0px"},"slow");
				page=1;
			}else{
				$v_show.animate({left:"-="+v_width},"slow");
				page++;
		}}
		$check_list_li.eq(page-1).addClass("current").siblings().removeClass("current")
		return false;
	})
	$(".block_9 .jump .jump_arrow a:last").click(function(){
		if(!$v_show.is(":animated")){
			if(page==1){
				$v_show.animate({left:"-="+v_width*(page_count-1)},"slow");
				page=page_count;
			}else{
				$v_show.animate({left:"+="+v_width},"slow");
				page--;
		}}
		$check_list_li.eq(page-1).addClass("current").siblings().removeClass("current")
		return false;
	})
}
//block_10
$(block_10);
function block_10(){
	var $comment=$("#conment");
	$(".act_list .bigger").click(function(){
		if(!$comment.is(":animated")){
		if($comment.height()<200){
			$comment.animate({height:"+=50"},"slow");
		}}
		return false;
	})
	$(".act_list .smaller").click(function(){
		if(!$comment.is(":animated")){
		if($comment.height()>50){
			$comment.animate({height:"-=50"},"slow");
		}}
		return false;
	})
	$(".act_list .up").click(function(){
		if(!$comment.is(":animated")){		
			$comment.animate({scrollTop:"-=50"},"slow");
		}
		return false;
	})
	$(".act_list .down").click(function(){
		if(!$comment.is(":animated")){
			$comment.animate({scrollTop:"+=50"},"slow");
		}
		return false;
	})
}

//block_11
$(block_11);
function block_11(){
	var $checkbox=$(".love_list input:checkbox")
	$checkbox.attr("checked",false);
	$("#check_all").click(function(){
		$checkbox.attr("checked",true);
	})
	$("#check_no").click(function(){
		$checkbox.attr("checked",false);
	})
	$("#check_reverse").click(function(){
		$checkbox.each(function(){
			$(this).attr("checked",!$(this).attr("checked"));
		})
		
	})
	$(".block_11 .act input").click(function(){
		$checkbox.attr("checked",this.checked);

	})
	//第一种方法:
	$checkbox.click(function(){
		var flag=true;
		$checkbox.each(function(){
			if(!this.checked){
				flag=false;
			}			
		})
		$(".block_11 .act input").attr("checked",flag)
	})
	//第二种方法:
	$checkbox.click(function(){
		$(".block_11 .act input").attr("checked",$checkbox.length==$checkbox.filter(":checked").length)
	})
}

//block_12
$(block_12);
function block_12(){
	var $seclet=$(".block_12 .con select");	
	$(".block_12 .click").click(function(){
		$seclet.css("height","120px").attr("multiple","multiple");
		return false;
	})
	$("#add").click(function(){
		var $options=$("#select1 option:selected");
		$options.appendTo("#select2");
	})
	$("#add_all").click(function(){
		var $options=$("#select1 option");
		$options.appendTo("#select2");
	})
	$("#select1").dblclick(function(){
		var $options=$("option:selected",this);
		$options.appendTo("#select2");
	})
	$("#remove").click(function(){
		var $options=$("#select2 option:selected");
		$options.appendTo("#select1");
	})
	$("#remove_all").click(function(){
		var $options=$("#select2 option");
		$options.appendTo("#select1");
	})
	$("#select2").dblclick(function(){
		var $options=$("option:selected",this);
		$options.appendTo("#select1");
	})
	
}

//block_13
$(block_13);
function block_13(){
	$(".reg_list li :input.required").each(function(){
		var $required=$("<strong class='color_red size_14'>*</strong>")
		var $parent=$(".reg_list li:has('.required')");
		$(this).parent().parent().append($required)  //正常写法
		//$required.appendTo($parent) //为什么这样写的话，就会出现两个*号。。。。。。。。。？？？？
	})
	$(".reg_list li :input").blur(function(){
		var $parent=$(this).parent().parent();
		$parent.find("p").remove();
		if($(this).is("#username")){
			if(this.value==""|| this.value.length<6){
				var errorMsg="请至少输入6位的用户名！";
				$parent.append("<p class='error'>"+errorMsg+"</p>")
			}else{
				var okMsg="输入正确！";
				$parent.append("<p class='ok'>"+okMsg+"</p>")
			}
		}
		if($(this).is("#email")){
			if(this.value==""||(this.value!="" && !/.+@+\.[a-zA-Z]{2,4}$/.test(this.value))){ //不明白这句正则表达式的意思，并且在此例中，貌似有错误，不论邮箱如何写，都会提示错误。。。。？？
				var errorMsg="请输入正确的E-Mail地址！";
				$parent.append("<p class='error'>"+errorMsg+"</p>")
			}else{
				var okMsg="输入正确！";
				$parent.append("<p class='ok'>"+okMsg+"</p>")
			}
		}
	}).keyup(function(){
		$(this).triggerHandler("blur")
		})
	  .focus(function(){
		$(this).triggerHandler("blur")
		})
	$("#send").click(function(){
		$(".reg_list li :input").trigger("blur");
		var numError=$(".reg_list li .erro").length;
		if(numError){
			return false;
		}
		alert("注册成功，密码已发到你的邮箱，请查收")
	})
}

//block_14
$(block_14);
function block_14(){
	$(".block_14 #radio_box").hide();
	$(".block_14 #checkbox_box").hide();
	$(".radio_link").click(function(){
		$(".block_14 #radio_box").show();
		$(".block_14 tr").click(function(){
		$(this).addClass("highlight").siblings().removeClass("highlight").end()
		.find(":radio").attr("checked",true)		
		})
		$(".block_14 tr.td_title").click(function(){
			$(this).removeClass("highlight")
		})
		$(".block_14 :radio:checked").parents("tr").addClass("highlight")
		return false;
	})	
	$(".checkbox_link").click(function(){
		$(".block_14 #checkbox_box").show();		
		$(".block_14 tr").click(function(){
			var hasSelected=$(this).hasClass("highlight");
			$(this)[hasSelected?"removeClass":"addClass"]("highlight").find(":checkbox").attr("checked","!hasSelected");
		})
		$(".block_14 tr.td_title").click(function(){
			$(this).removeClass("highlight")
		})
		return false;
	})	
	
}

//block_15
$(block_15);
function block_15(){
	var li=$(".block_15 .nav li");
	var contain=$(".character_box");
	$(".character_box:first").show();
	$(".character_box:not(:first)").hide();
	li.hover(
		function(){
			$(this).addClass("current");
			var index=li.index(this);
			contain.eq(index).show().siblings(contain).hide();
		},
		function(){
			$(this).siblings().removeClass("current");
		}
	)
}
//block_16
$(block_16);
function block_16(){
	$(".tab li a").attr("href","javascript:return false;");   
	$(".tab li a").each(function(index){              
		$(this).click(function(){   
			changeImage(this,index);       
		});            
	});    
	autoChangeImage();  
}
function autoChangeImage(){   
	for(var i = 0; i<=10000;i++){   
		window.setTimeout("tab("+(i%3+1)+")",i*3000);              
	}   
}     
function tab(index){   
	$(".tab li:nth-child("+index+") a").click();   
}     
function changeImage(element,index){   
	var arryImgs = ["images/xz_3.gif","images/xz_4.gif","images/xz_5.gif"];
	var arryLinks = ["http://www.51.com","http://www.163.com","http://www.sina.com",]
	$(".tab li a").removeClass("current");   
	$(element).addClass("current"); 
	$(".form a").attr("href",arryLinks[index]);
	$(".form a").attr("target","_blank");  
	$(".form a img").attr("src",arryImgs[index]);   
}
//block_17
$(block_17);
function block_17(){
	$(".block_17 button").click(function(){
	  $(".animate_box").animate({left:'+=200px'}, 2000);
	  $(".animate_box").animate({top:'0px'}, 600);
	  $(".animate_box").queue(function(){
		  $(this).toggleClass("red");
		  $(this).dequeue();
	  });
	  $(".animate_box").animate({left:'10px', top:'30px'}, 700);
  });
}
//block_18
$(block_18);
function block_18(){
	var input_text=$(".block_18:has(input)")
	$("#old").click(function(){
		input_text.trigger("focus");
	});
	$("#new").click(function(){
		input_text.triggerHandler("focus");
	});
	input_text.focus(function(){$("<span>Focused!</span>").appendTo(".block_18").fadeOut(1000); }); 
}
//block_19:回调函数的用法
$(block_19);
function block_19(){
	function showDiv(callback){
	  $("#div1").show();
	  callback($("#div1"));
	}
	showDiv(function($div){
	  $div.text("hello world");
	});
}
