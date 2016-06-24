$(autoSize);
function autoSize(){
    var windowHeight=$(window).height(),
    	mainLeftWidth= $('.main_left').width();
    $('.main_left').height(windowHeight-50+'px');
    if(mainLeftWidth>200){
    	$('.main_right').css('padding-left','16%')    	
    }
    else{
    	$('.main_right').css('padding-left',210+'px')
    }
}
$(selectBar);
function selectBar(){
	var inputBox=$('.select_bar .select_input input'),
        inputArrow=$('.select_bar .select_input .r'),
        popup=$('.select_bar .popup');
	inputBox.focus(function(){
        var thisPopup=$(this).parent().siblings('.popup');
		thisPopup.hide();
	})
	inputBox.blur(function(){
        var thisPopup=$(this).parent().siblings('.popup');
		thisPopup.hide();
	})
    inputArrow.click(
        function(){
            var thisPopup=$(this).parent().siblings('.popup');
            if(thisPopup.is(':visible')==false){
               thisPopup.show();
            }
            else{
                thisPopup.hide();
            }
            return false;
        }
    )
     $(document).bind("click", function(e){
        var target  = $(e.target);
        if(target.closest(".select_bar").length == 0){
            popup.hide();
        }
    });
}