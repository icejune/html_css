//----------------------首页banner轮播图-----------------------------
$(bannerSlide);
function bannerSlide() {
	var banner = $('.banner'), // 外围banner
		slideHandels = banner.find('.slide_list li'), // 下面点
		max = slideHandels.length - 1, // 长度,数组是从0开始的
		bgBanner = banner.find('.banner_img'), // 大banner背景图
		count = 0, // 坐标
		setInterval_time = 4000,
		imgArr = ['images/www/banner_1.jpg','images/www/banner_2.jpg','images/www/banner_3.jpg','images/www/banner_4.jpg'],
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
		contain=$('.character_box'),
		pre=$('.character .title .pre'),
		next=$('.character .title .next'),
		max = title_txt.length - 1, // 长度,数组是从0开始的
		count=title_txt.index();
	init();	//初始化	
	function init(){
		title.find('a').click(function(e) {
			e.preventDefault();
		});
		$('.character .title h3 span:first').show();
		$('.character_box:first').show();
		pre.addClass('arrow_left_disabled');
	}
	handlesEvent();
	function handlesEvent() {
		pre.click(function() {
			count--;
			if(count <= 0) { // 超过最大值则设置为第一个
				count=0;
				$(this).addClass('arrow_left_disabled');
				next.removeClass('arrow_right_disabled');
			}
			characterChange();
		})
		next.click(function(){
			count++;
			if(count>=max){
				count=max;
				$(this).addClass('arrow_right_disabled');
				pre.removeClass('arrow_left_disabled');
			}
			characterChange();
		})
	}
	function characterChange() {
		title_txt.eq(count).show('slow').siblings().fadeOut('slow');
		contain.eq(count).show('slow').siblings().fadeOut('slow');
	};	
};

//----------------------------------首页Pipeline类目切换-----------------------------------
$(wwwPp);
function wwwPp(){
	ppTab();
	function ppTab(){
		var item=$('#pp_tab li'),
			contain_wrap=$('.recommend_con'),
			contain=contain_wrap.find('.recommend_item'),
			pre=$('#pre'),
			next=$('#next'),
			count=0;
		item.find('a').click(function(e){
			e.preventDefault();
		})
		pre.addClass('arrow_left_disabled');		
		item.click(function(e){
			var self=$(this),
				index=self.index(),
				max=contain_wrap.eq(index).find(".recommend_item").length -1;
			e.preventDefault();
			self.addClass('current');
			item.eq(index).siblings().removeClass('current');
			contain_wrap.eq(index).show().siblings().hide();
			ppContain(index,max);
		})		
		function ppContain(index,max){
			pre.click(function(e){				
				e.preventDefault();					
				count--;
				if(count<= 0) { // 超过最大值则设置为第一个
					count=0;
					$(this).addClass('arrow_left_disabled');
					next.removeClass('arrow_right_disabled');
				}
				contain.eq(count).show().siblings().hide();				
			})
			next.click(function(e){
				e.preventDefault();
				count++;
				if(count>=max){
					count=max;
					$(this).addClass('arrow_right_disabled');
					pre.removeClass('arrow_left_disabled');
				}
				contain.eq(count).show().siblings().hide();
			})
			pre.first().click();					
		}
		item.first().click();
	}
}
//----------------------------------首页Pipeline类目下切换获取Pipeline-----------------------------------
/*function get_puplic_pipeline(tag_id){
	$.ajax({
		url : '/Pipeline/get_public_pipeline',
		data : ({
			'tag_id' : tag_id,
		}),
		type : 'post',
		dataType : 'html',
		success : function(msg) {
			$('#www_pp_recommend').html(msg);
			wwwSlidePp();  
		},
		error : function() {
			alert('系统出错!');
		}
	})	
}*/
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
	var x=15;
	var y=-15;
	var ico_info=$('.pp_submenu li .ico_info')
	ico_info.mouseover(function(e){
		var info = $(this).siblings().parent().find('.abstract_info').html();
		info = info == '' ? '暂无说明' : info;
		var chat_info='<div id="chat_info" class="chat"><i class="arrow"></i><div class="chat_contain"><p>'+info+'</p></div></div>';
		
		$('.pp_menu_wrap').append(chat_info);
		$('#chat_info').css({'top':(e.pageY+y)+'px','left':(e.pageX+x)+'px'}).show('fast');
		return false;		
	}).mouseout(function(){
		$('#chat_info').remove();
	}).mousemove(function(e){
		$('#chat_info').css({'top':(e.pageY+y)+'px','left':(e.pageX+x)+'px'}).show('fast');
	})

};
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