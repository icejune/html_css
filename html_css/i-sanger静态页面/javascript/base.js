//----------------------首页banner轮播图-----------------------------
$(bannerSlide);
function bannerSlide() {
	var banner = $('.banner'), // 外围banner
		slideHandels = banner.find('.slide_list li'), // 下面点
		max = slideHandels.length - 1, // 长度,数组是从0开始的
		bgBanner = banner.find('.banner_img'), // 大banner背景图
		count = 0, // 坐标
		setInterval_time = 4000,
		imgArr = ['/images/www/banner_1.jpg','/images/www/banner_2.jpg','/images/www/banner_3.jpg','/images/www/banner_4.jpg'],
		setInter_elem; // 用于保存setInterval返回的id

	if(!banner.length) return;

	// 初始化
	init();		

	function init() {
		preImg(); // 预加载大图片

		// 去掉a里的默认事件
		banner.find('a').click(function(e) {
			e.preventDefault()
		});

		// 设置时间调用
		// setInterval第一个函数最好用匿名函数
		// 因为他会挂在全局，很有可以会跟别的重名而造成问题
		setInter_elem = setInterval(function() {
			imgChange();
		}, setInterval_time);

		// 点绑定事件
		handlesEvent();

		// 初始化时从第一个开始
		slideHandels.first().click();
	}

	// 预加载大图片
	function preImg() {
		var i = 0,
			img;
		for( ; i < max; i++) {
			img = new Image();
			img.src = imgArr[i];
		};
	};		
	// handles添加事件
	function handlesEvent() {
		slideHandels.click(function() {
			var self = $(this);  
			if(self.hasClass('current')) return ;
			count = self.index();
			--count;
			imgChange();
		})
	}
	// 图片切换
	function imgChange() {
		count ++;
		if(count > max) { // 超过最大值则设置为第一个
			count = 0;
		};
		bgBanner.css('background-image','url(' + imgArr[count] + ')');
		slideHandels.removeClass('current').eq(count).addClass('current');
	};
	//鼠标移上去图片停止轮播
	bgBanner.hover(
		function(){
			clearInterval(setInter_elem)
		}, 
		function(){
			setInter_elem=setInterval(function(){imgChange()},setInterval_time);
		}
	);
}			

//----------------------------------首页网站特性切换-----------------------------------
$(characterTitle);
function characterTitle(){
	var title=$('.character .title'),
		title_txt=title.find('span'),
		wrap_title=title.find('em'),
		wrap_con=$('.character_con'),
		items=$('.character_box'),		
		title_width=title_txt.outerWidth();
		item_width=items.outerWidth(),
		max=items.length - 1,
		pre=title.find('.pre'),
		next=title.find('.next'),
		count=0;	
	if(!items) return;// 如果不存在元素则跳转
	init();	//初始化	
	function init(){
		title.find('a').click(function(e) {
			e.preventDefault();
		});
		$('.character .title h3 span:first').show();
		$('.character_box:first').show();
		pre.addClass('arrow_left_disabled');
		wrap_title.css('width',title_width*(title_txt.length)+'px');
		wrap_con.css('width',item_width*(items.length)+'px')
	}
	handlesEvent();
	function handlesEvent() {
		pre.click(function() {
			// 如果count==0 || 正在运行则什么也不作
			if(!count || wrap_con.is(':animated')) return;
			count--;
			if(!count){
				pre.addClass('arrow_left_disabled');
				next.removeClass('arrow_right_disabled');
			}
			else{
				next.removeClass('arrow_right_disabled');
				pre.removeClass('arrow_left_disabled');					
			}
			wrap_title.animate({left:'+=' + title_width +'px'},'fast');
			wrap_con.animate({left:'+=' + item_width + 'px'},'fast');	
		})
		next.click(function(){
			// 如果count 大最值为 max || 前一个动画还在运行则什么也不作
			if(count >= max || wrap_con.is(':animated')) return ;
			count++;
			// 达到最大值的时候把next加class ，没达到则next/pre都设置为可点的显示效果
			if(count >= max){
				next.addClass('arrow_right_disabled');
				pre.removeClass('arrow_left_disabled');
			}
			else{
				next.removeClass('arrow_right_disabled');
				pre.removeClass('arrow_left_disabled');				
			};
			// 运行动画
			wrap_title.animate({left:'-=' + title_width +'px'},'fast');
			wrap_con.animate({left:'-=' + item_width + 'px'},'fast');
		})
	}
};
//----------------------------------首页Pipeline类目切换-----------------------------------
$(wwwPp);
function wwwPp(){
	var nav_list=$('#pp_tab li'),
		tab_con=$('.recommend_con'),			
		pre=$('#pre'),
		next=$('#next'),
		count=0,
		max,cur_item,cur_con;//当前tab_con的长度 / 当前滑动item // 当前内容区
	init();
	changePage();
	function init(){
		tab_con.each(function(){
			var self=$(this),
				items=self.find('.recommend_item');
			self.data('maxlen',items.length);
			self.data('count',count);
			items.first().show();
		})
		//默认向前翻页无效
		pre.addClass('arrow_left_disabled');
		nav_list.click(function(){
			var self=$(this),
				index=self.index();	
			self.siblings().removeClass('current');
			cur_con=tab_con.eq(index);//当前tab_con
			cur_con.show().siblings().hide();
			//切换到当前的tab_con,存储最大数目及当前数目；
			max=cur_con.data('maxlen');
			count=cur_con.data('count');
			return false; 
		}).first().click();
	}
	function changePage(){
		pre.click(function(){			
			count--;
			if(count<= 0) { // 超过最大值则设置为第一个
				count=0;
				pre.addClass('arrow_left_disabled');
				next.removeClass('arrow_right_disabled');
			}
			changeItem();
			return false;	
		})
		next.click(function(){
			count++;
			if(count>=max){
				count=max;
				next.addClass('arrow_right_disabled');
				pre.removeClass('arrow_left_disabled');
			}
			changeItem();
			return false;
		})
	}
	function changeItem(){
		cur_con.data('count',count);
		cur_item = cur_con.find('.recommend_item').eq(count);
		cur_item.show().siblings().hide();
	}

}
//----------------------------------首页Pipeline类目下切换获取Pipeline-----------------------------------
function get_puplic_pipeline(tag_id){
	$.ajax({
		url : '/Pipeline/get_public_pipeline',
		data : ({
			'tag_id' : tag_id,
		}),
		type : 'post',
		dataType : 'html',
		success : function(msg) {
			$('#www_pp_recommend').html(msg);
			wwwPp();  
			$('#pp_tab_'+tag_id).addClass('current');
		},
		error : function() {
			alert('系统出错!');
		}
	})	
}
//----------------------------------公共头部菜单交互-----------------------------------
$(headerMenu);
function headerMenu(){
  var leftMenu = $('.header ul[class="menu left_menu"]>li');
	leftMenu.hover(
		function(){
			$(this).addClass('current');
		},
		function(){
			$(this).removeClass('current');
		}
  );
  var subMenu=leftMenu.find('li');
  	subMenu.hover(
  		function(){
			$(this).addClass('current');
		},
		function(){
			$(this).removeClass('current');
		}
  )
  var rightMenu = $('.header ul[class="menu right_menu"]>li');
  var hasPopupMenu = $('.header ul[class="menu right_menu"]>li:has(.popup_item)');
  	rightMenu.hover(
		function(){
			$(this).addClass('hover');
		},
		function(){
			$(this).removeClass('hover');
		}
	);
	hasPopupMenu.click(function(){
	    var $this = $(this);
	    $this.siblings().removeClass('current');
	    $this.toggleClass('current');
	    return false;
	  }).find('.popup_item').click(function(e) {
	  	e.stopPropagation();
	  });
	$(document).click(function() {
	    if(rightMenu.hasClass('current')) {
	      rightMenu.removeClass('current');
	    }
	  })
};
//----------------------------------工作流编辑页左部菜单参数说明浮层-----------------------------------
$(ppMenuIcoInfo);
function ppMenuIcoInfo(){
	var x=25,
		y=-12,
		ico_info=$('.pp_submenu li .ico_info'),
		timer;		
	ico_info.mouseover(function(){
		clearInterval(timer);
		var info = $(this).siblings().parent().find('.abstract_info').html();
		info = info == '' ? '暂无说明' : info;
		var chat_info='<div id="chat_info" class="chat"><i class="arrow"></i><div class="chat_contain"><p>'+info+'</p></div></div>';
		$('.main_left').append(chat_info);
		$('#chat_info').css({'top':$(this).offset().top+y+'px','left':$(this).offset().left+x+'px'}).show();
		return false;
	})
	ico_info.mouseout(function(){
		timer=setInterval(function(){
			$('#chat_info').remove();
		},500)
	})
	$(document).on('mouseover','#chat_info',function(){
		clearInterval(timer);
	})
	$(document).on('mouseout','#chat_info',function(){
		timer=setInterval(function(){
			$('#chat_info').remove();
		},500)
	})

};
//----------------------------------工作流编辑页右部模块参数折叠展开效果-----------------------------------
$(ppParameterModule);
function ppParameterModule(){
	var module_title=$('.parameter .module .title');
	module_title.click(
		function(){
			var num=0,
				module=$(this).parent();
			num++;
			if(num%2==0){
				module.removeClass('module_unfold');
			}
			else if(module.hasClass('module_unfold')){
				module.removeClass('module_unfold');
			}
			else{
				module.addClass('module_unfold').siblings().removeClass('module_unfold');
			}
		}
	)
}
//----------------------------------公共工作流展示鼠标移上去的效果-----------------------------------
$(publicPpList);
function publicPpList(){	
	var li=$('#public_pp_list >li');
	li.hover(
		function(){
	   		$(this).addClass('hover');
	  	},
	  	function(){
	  		$(this).removeClass('hover');
	  	}
	)	
};
//----------------------------------左侧菜单展开/收缩效果-----------------------------------
$(leftNav);
function leftNav(){
	var link=$('.left_nav li .link');
	link.click(function(e){
		e.preventDefault();
	});
	toggleThis();
	function toggleThis(){
		var count = 0;
		link.click(
			function(){
				$(this).parent('li').toggleClass('fold',count++ % 2 == 0);
			}
		)
	}
}