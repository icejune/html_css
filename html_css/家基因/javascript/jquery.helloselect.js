;(function($, window, document,undefined) {
	
      function select(ele,opts){
			this.defaults = {
					triggerClass:'.sbtn',
					menuClass:'.menu',
					optsDefault:0,
                    current:'current',
					cityLink:false,
					cityTip:'全国省/市/区三级联动',
					cityDate:'javascript/citylink.json'
			};
			this.opts = $.extend({},this.defaults,opts);
			this.Ele = ele;
			this.selected = this.Ele.find(this.opts.menuClass).children().eq(this.opts.optsDefault).text();
	  }	
	  
	  select.prototype.init = function(type){
            var dom = '<span class="'+this.opts.triggerClass.substring(1)+'"><a href="javascript:;">'+type+'</a><i class="arrow"></i></span>';
            this.Ele.prepend(dom);
	  }
	  
	  select.prototype.open = function(){
		    var self = this;
			this.Ele.find(this.opts.triggerClass).on('click',function(e){
				  e.stopPropagation();	
				  if($(this).next().is(":visible")){
					    $(this).next().removeClass(self.opts.current);
				  }else{
						$(this).next().addClass(self.opts.current);
				  }
				  
			 });
	  }
	   select.prototype.getSelected = function(){
		   	var self = this;
			this.Ele.find(this.opts.menuClass).on('click','li',function(){
				var selected = $(this).text();
				 $(this).parent().parent().find("a").text(selected);
				 self.Ele.removeClass(self.opts.current);
			});   
	   }
	  select.prototype.close = function(){
		    var self = this; 
			$("html,body").click(function(){
				  self.Ele.find('ul').removeClass(self.opts.current);
			});
	  } 
	  //普通下拉
	 select.prototype.common = function(){
		this.init(this.selected);
		this.open();
		this.getSelected();
		this.close();
	 }
    //三级联动
	select.prototype.cityOpts = function(optsList){
		var cityOptsList = '<li>'+optsList+'</li>';
		return cityOptsList;
	}

	 select.prototype.citylink = function(){
		var self = this;
		this.Ele.html('<ul class="'+this.opts.menuClass.substring(1)+'"></ul><ul class="menu2"></ul><ul class="menu3"></ul>');
		this.init(this.opts.cityTip);
		this.Ele.find('ul').eq(0).html('');
		var M1 = this.Ele.find('ul').eq(0);
		var M2 = this.Ele.find('ul').eq(1);
		var M3 = this.Ele.find('ul').eq(2);
		this.open();
		this.close();
		
		$.getJSON(this.opts.cityDate,function(result){
			$.each(result[0], function(p1){
				M1.append(self.cityOpts(p1)); 
			});

			M1.on('click','li',function(e){
				    e.stopPropagation();	
					$(this).addClass(self.opts.current).siblings().removeClass(self.opts.current);
					M2.addClass('current').html('');
					M3.removeClass('current').html('');
					var selected = $(this).text();
					$.each(result[0],function(p1,p2){
							if(selected == p1){
								$.each(p2,function(p3,p4){
									  M2.append(self.cityOpts(p3));
								});
						
								 M2.on("click","li",function(e){
									    e.stopPropagation();	
										$(this).addClass(self.opts.current).siblings().removeClass(self.opts.current);
										var selected = $(this).text();
										M3.addClass('current').html('');
										$.each(p2,function(p3,p4){
											if(selected == p3){
												$.each(p4.split(","),function(){
													  M3.append(self.cityOpts(this));
												});	
												M3.on("click","li",function(){
													$(this).addClass(self.opts.current).siblings().removeClass(self.opts.current);
													var citylinkResult = [];
													self.Ele.find('ul').each(function(){
														$(this).find('li').each(function(){
															if($(this).hasClass(self.opts.current)){
																citylinkResult.push($(this).text());
															}
														});
													});
													self.Ele.find(self.opts.triggerClass).find('a').text(citylinkResult.join('/'));
												});
												
											}
										});
								});
								
							}	
					});

			});  
			
		 });
	 }
	 
	  select.prototype.create = function(){
		  this.opts.cityLink ? this.citylink() : this.common();
	  }
	 
	$.fn.helloSelect = function(opts){
		var action = new select(this,opts);
		return action.create();
	}
	
})(jQuery, window, document);