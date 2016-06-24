//----------------------引导页-----------------------------
$(index);
function index(){
	$.each($('.img'),function(i, data) {
		$(this).addClass('add_bigsmall'+i)
	})
	var apples = new Array('images/index/apple_green.png','images/index/apple_red.png','images/index/apple_yellow.png', 'images/index/apple_red.png', 'images/index/apple_yellow.png');
	var brand  = new Array('images/index/go_1.png','images/index/go_2.png','images/index/go_3.png','images/index/go_4.png','images/index/go_5.png');
	var location = new Array({'width':'122px','height':'80px','left':'52%','z-index':'100'},{'width':'122px','height':'80px','left':'58%','z-index':'100'},{'width':'122px','height':'80px','left':'69%','z-index':'100'},{'width':'122px','height':'80px','left':'68%','top':'47%','z-index':'10000'},{'width':'122px','height':'80px','left':'52.5%','top':'49.5%','z-index':'100'});
    $('.img').hover(function(){
		var index = $(this).index('.img');
        $(this).removeClass('add_bigsmall'+index);
        $(this).attr('src',brand[index]);
        $(this).css(location[index]);
    },function(){
		var index = $(this).index('.img');
        $(this).attr('src',apples[index]);
        $(this).addClass('add_bigsmall'+index);
		$(this).removeAttr('style');
      
    });
}
//----------------------首页banner轮播图-----------------------------
$(bannerSlide);
function bannerSlide() {
	var banner = $('.home .banner'), // 外围banner
		slideHandels = banner.find('.slide_list li'), // 下面点
		max = slideHandels.length - 1, // 长度,数组是从0开始的
		bgBanner = banner.find('div'), // 大banner背景图
		count = 0, // 坐标
		setInterval_time = 4000,
		imgArr=['banner_1','banner_2','banner_3'],
		setInter_elem; // 用于保存setInterval返回的id

	if(!banner.length) return;

	// 初始化
	init();		

	function init() {

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
		bgBanner.attr('class',imgArr[count]);
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

//----------------------------------首页美吉总部形象展示切换-----------------------------------
$(homeShow);
function homeShow(){
	var nav=$('#showNav'),
		nav_list=nav.find('li'),
		wrap=$('.show_contain'),
		show=wrap.find('.show_list'),
		show_list=show.find('li'),		
		items=wrap.find('.item'),
		screen_width=$('.item_wrap').width();
	init();	//初始化
	function init(){
		nav_list.find('a').click(function(e) {
			e.preventDefault();
		});
		items.hide();
		$('#showNav li:first').addClass('current');
		$('.show_contain .item:first').show();
		show.css('width',(show_list.width()+14)*(show_list.length)+'px');
	}
	nav_list.click(
		function(){
			var self=$(this),
				index=self.index();	
			self.addClass('current').siblings().removeClass('current');
			cur_con=items.eq(index);//当前tab_con
			cur_con.show().siblings().hide();
		}
	)
	items.each(function(){
		var self=$(this),
			show_list=self.find('.show_list li'),
			max=Math.ceil(show_list.length/5),
			pre=self.find('.ico_pre'),
			next=self.find('.ico_next'),
			count=1;

		pre.addClass('disabled_pre');		
		pre.click(function() {
			// 如果count==0 || 正在运行则什么也不作
			if(count<=1 || show.is(':animated')) return;
			count--;
			if(count<=1){
				pre.addClass('disabled_pre');
				next.removeClass('disabled_next');
			}
			else{
				next.removeClass('disabled_next');
				pre.removeClass('disabled_pre');					
			}
			show.animate({left:'+=' + screen_width + 'px'},'slow');	
		})
		next.click(function(){			
			// 如果count 大最值为 max || 前一个动画还在运行则什么也不作
			if(count >= max || show.is(':animated')) return ;
			count++;
			// 达到最大值的时候把next加class ，没达到则next/pre都设置为可点的显示效果
			if(count >= max){
				next.addClass('disabled_next');
				pre.removeClass('disabled_pre');
			}
			else{
				next.removeClass('disabled_next');
				pre.removeClass('disabled_pre');				
			};
			// 运行动画
			show.animate({left:'-=' + screen_width + 'px'},'slow');
		})
	});
	
};
//----------------------------------首页行业动态切换-----------------------------------
$(homeDynamic);
function homeDynamic(){
	var item=$('.dynamic .simple_list')
		li=$('.dynamic .title li');
	item.hide();
	$('.dynamic .title li:first').addClass('current');
	$('.dynamic .simple_list:first').show();
	li.find('a').click(function(e) {
		e.preventDefault();
	});
	li.click(
		function(){
			var self=$(this),
				index=self.index();
			self.addClass('current').siblings().removeClass('ccurrent');
			item.eq(index).show().siblings().hide();
		}
	)

}
//----------------------------------时间轴年份切换-----------------------------------
$(timeLine);
function timeLine(){
	var nav=$('#timeLine .nav'),
		li=nav.find('li'),
		wrap_con=$('#timeLine .item_wrap ul'),
		li_width=li.width(),
		pre=$('#timeLine .nav .ico_pre'),
		next=$('#timeLine .nav .ico_next'),
		max=li.length-1;
	li.find('a').click(function(e){
		e.preventDefault();
	})
	init();	
	function init(){
		$('#timeLine .nav li:eq(-3)').addClass('current');
		var li_cur=nav.find('.current'),
			cur_index=li_cur.index();
		li.eq(cur_index-2).prevAll().hide();
		next.addClass('disabed_next');
	}
	function timeToggle(){
		var cur_index=nav.find('.current').index();
		li.show();
		li.eq(cur_index-2).prevAll().hide();
		li.eq(cur_index+2).nextAll().hide();
	}
	li.click(function(){
		var self=$(this);
			cur_index=nav.find('.current').index();
		if(self.hasClass('blank')) return false;
		self.addClass('current').siblings().removeClass('current');
		if(cur_index>1&&cur_index<=(max-1)){
			timeToggle();				
			next.removeClass('disabed_next');
		}
		else{
			pre.addClass('disabed_pre');
		}
	})
	pre.click(
		function(){
			var cur_index=nav.find('.current').index();
			cur_index--;	
			if(cur_index>1&&cur_index<=(max-1)){				
				nav.find('.current').prev().addClass('current').siblings().removeClass('current');
				timeToggle();				
				next.removeClass('disabed_next');				
			}
			else{
				pre.addClass('disabed_pre');
			}
		}
	)
	next.click(
		function(){
			var cur_index=nav.find('.current').index();
			cur_index++;
			if(cur_index<=(max-2)){				
				nav.find('.current').next().addClass('current').siblings().removeClass('current');
				timeToggle();
				pre.removeClass('disabed_pre');
			}
			else{
				next.addClass('disabed_next');
			}
		}
	)
	
}
