;(function($, window,undefined) {
	
      function Carousel(ele,opts){
			this.defaults = {
				container:'.myCarousel',
				arrow:true,
				dots:true,
				autoPlay:false,
				interval:3000,
				onLeave:function(index){},
				onEnter:function(index){}
			};
			this.opts = $.extend({},this.defaults,opts);
			this.index = 0;
			this.container = $(this.opts.container);                  //外层容器
			this.item = this.container.find('.carousel-item');   //轮播容器
			this.w = $(window).width();
	  }	
	  
    Carousel.prototype.init = function(){
			 //初始化容器
			 this.item.css({width:this.w}).wrapAll('<div class="wrap"></div>');
			 
			 //初始化左右导航
			 if(this.opts.arrow === true){
				 this.container.append('<a class="carousel-arrow carousel-arrow-left" href="javascript:;"></a><a class="carousel-arrow carousel-arrow-right" href="javascript:;"></a>');
			 }
			 
			 //初始化焦点
			 if(this.opts.dots === true){
				 this.container.append('<div class="carousel-dots"></div>');
				 var dots = this.item.length;
				 for(var i=0;i<dots;i++){
					 this.container.find('.carousel-dots').append('<i class="dots"></i>');
				 }
				 this.container.find('.carousel-dots').find(".dots").eq(this.index).addClass('current');
			 }
			 
			 //初始化默认选中
			 this.item.eq(this.index).css({'left':0}).siblings().css({'left':-this.w});
    }
	
	Carousel.prototype.current = function(index){
		this.container.find('.dots').eq(index).addClass('current').siblings().removeClass('current');
	}
	
	Carousel.prototype.toLeft = function(){
		if(!this.item.is(":animated")){
			this.item.eq(this.index).stop(false,true).animate({'left':this.w},500);
			this.item.eq(this.index-1).stop(false,true).css({'left':-this.w}).stop(false,true).animate({'left':0},500);
			this.index >0 ? this.index-- : this.index = this.item.length-1;
		}
		
		//回调函数
		if(this.opts.onLeave){
			this.opts.onLeave(this.index+1 > this.item.length-1? 0 : this.index+1);
		}
		if(this.opts.onEnter){
			this.opts.onEnter(this.index);
		}

	}	
	
	Carousel.prototype.toRight = function(){
		if(!this.item.is(":animated")){
			this.index >= this.item.length-1 ? this.index = 0 : this.index++;
			this.item.eq(this.index-1).stop(false,true).animate({'left':-this.w},500).siblings().css({'left':-this.w});
			this.item.eq(this.index).css({'left':this.w}).stop(false,true).animate({'left':0},500);
		}
		
		//回调函数
		if(this.opts.onLeave){
			this.opts.onLeave(this.index == 0 ? this.item.length-1 : this.index-1);
		}
		if(this.opts.onEnter){
			this.opts.onEnter(this.index);
		}

	}

    Carousel.prototype.autoPlay = function(){
		var self = this;
		if(this.opts.autoPlay){
			function auto(){
				self.toRight();
				self.current(self.index);
			}
			this.timer = setInterval(auto,this.opts.interval);
		}
	}
	
	Carousel.prototype.run = function(){
		this.init();
		this.autoPlay();
		
		var self = this;
		this.container.find('.carousel-arrow-left').bind('click',function(){
			self.toLeft();
			self.current(self.index);
		});
		this.container.find('.carousel-arrow-right').bind('click',function(){
			self.toRight();
			self.current(self.index);
		});
		
		this.container.hover(function(){
			clearInterval(self.timer);
			
			$(this).find('.dots').bind('mouseover',function(){
						var index = $(this).index();
						self.current(index);
						 if(index > self.index){                     //toLeft();
								if(!self.item.eq(index).is(":animated")){
									self.item.eq(self.index).stop(false,true).animate({'left':-self.w},500);
									self.item.eq(index).css({'left':self.w}).stop(false,true).animate({'left':0},500);
								}
						 }else if(index <  self.index){            //toRight();
								if(!self.item.eq(index).is(":animated")){
									self.item.eq(self.index).stop(false,true).animate({'left':self.w},500);
									self.item.eq(index).css({'left':-self.w}).stop(false,true).animate({'left':0},500);
								}
						 }
						 
						//回调函数
						if(self.opts.onLeave){
							self.opts.onLeave(self.index);
						}
						if(self.opts.onEnter){
							self.opts.onEnter(index);
						}

						self.index = index;
			})
		},function(){
				 if(self.opts.autoPlay){
						self.autoPlay();
				 }
		});
		
		 $(window).resize(function(){
			 self.item.css({width:$(this).width()});
			 self.item.eq(self.index).animate({'left':0}).siblings().css({left:-$(this).width()});
			 self.w = $(this).width();
		 });
		
	}
	  
	$.fn.myCarousel = function(opts){
		var action = new Carousel(this,opts);
		return action.run();
	}
	
})(jQuery, window);