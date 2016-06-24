$(broadcast);
function broadcast(){
    var wrap=$('.broadcast'),
        ul=wrap.find('ul'),
        ico_close=wrap.find('.ico_close'),
        ul_height=parseInt(ul.css('height')),
        li_height=parseInt(ul.find('li').css('height')),
        setInter_elem,
        setInterval_time=3000;
    setInter_elem = setInterval(function() {
        roll();
    }, setInterval_time);
    function roll(){
        var topValue=Math.abs(parseInt(ul.css('top')));
        topValue = parseInt(topValue);
        if(isNaN(topValue)){ topValue = 0; }
        topValue=topValue+20;
        if(topValue>=ul_height){
            ul.animate({'top':0});
        }
        else{
            ul.animate({'top':-topValue+'px'});
        }
    }
    ul.hover(
        function(){
            clearInterval(setInter_elem);
        },
        function(){
            setInter_elem = setInterval(function() {
                roll();
            }, setInterval_time);
        }
    )
    ico_close.click(
        function(){
            wrap.hide();
            return false;
        }
    )
}
$(progressCircle);
function progressCircle(){
    $('.circle').each(function(index, el) {
        var num = $(this).find('span').text() * 3.6;
        if (num<=180) {
            $(this).find('.circle .right').css('transform','rotate(" + num + "deg)');
        } else {
            $(this).find('.circle .right').css('transform', 'rotate(180deg)');
            $(this).find('.circle .left').css('transform', 'rotate(" + (num - 180) + "deg)');
        };
    });
}
$(taskFinish);
function taskFinish(){
    var li=$('.task_list li'),
        checkbox=$('.task_list li input:checkbox'),
        count=0;
    checkbox.parent().siblings('dd').hide();
    li.hover(
        function(){
            $(this).addClass('hover');
            $(this).find('dd').show();
        },
        function(){
            $(this).removeClass('hover');
            $(this).find('dd:not(:has(input:checkbox))').hide();
        }
    )
    $(document).on('click','.task_list li input:checkbox',function(){
            if($(this).attr('checked')==undefined){
                $(this).attr('checked', true);
                $(this).parent().parent().parent().addClass('finished');
            }
            else{
                $(this).removeAttr('checked');
                $(this).parent().parent().parent().removeClass('finished');
            }
        }

    )
}
$(publicHoverHandle);
function publicHoverHandle(){
    publicHover('.project_item li');
    publicHover('.unread_list li'); 
    publicHover('.group_item li');
    publicHover('.member_list li');
    publicHover('.contact_list li');
    publicHover('.top_bar .small_menu li');
    publicHover('.framework li .node');
    publicHover('.box_msg .blog_date li');
    publicHover('.tag_control');
    function publicHover(tag,className){
        $(tag).hover(
            function(){
                $(this).addClass('hover');
            },
            function(){
                $(this).removeClass('hover');
            }
        )
    }
}
$(scrollbar);
function scrollbar(){
    $('.contact_layer .content').mCustomScrollbar();
    $('.time_tree .content').mCustomScrollbar();
    $('.contact_layer .contact_group').addClass('fold');
    $('.contact_layer .contact_group:first').removeClass('fold');
    var _title=$('.contact_layer .contact_group .title');
    _title.click(
        function(){
            if($(this).parent().hasClass('fold')){
                $(this).parent().removeClass('fold').siblings().addClass('fold');
            }
            else{
                $(this).parent().addClass('fold');
            }            
        }
    )
}
$(foldHandle);
function foldHandle(){
    fold('.task_item .block .title');
    function fold(tag){
        var count=0;
        $(tag).click(
            function(){
                $(this).parent().toggleClass('fold',count++ % 2==0)
            }
        )
    }
}
$(autoHeight);
function autoHeight(){
    var clientHeight=$(document).height(),
        windowHeight=$(window).height(),
    $('.main_left').height(clientHeight-120+'px');
    $('.stretch_layer').height(clientHeight-110+'px');
    $('.contact_layer').height(windowHeight-30+'px');
    $('.contact_layer .content').height(windowHeight-(_len*_titleHeight)-156+'px');
    $('.time_tree .content').height(windowHeight-250+'px');
}
$(contactBook);
function contactBook(){
    var contactLayer=$('.contact_layer'),
        contactFoldBtn=$('#contactBtnFold'),
        bodyMain=$('.body_main'),
        headerContactBtn=$('.top_bar .contact_book');    
    if($('.top_bar .contact_book:not([class="current"])')){
        headerContactBtn.click(
            function(){
                $(this).addClass('current');
                bodyMain.addClass('has_contact_layer');
                contactLayer.fadeIn('slow');
                return false;
            }
        )       
    }
    else{
         contactFoldBtn.click(
            function(){
                headerContactBtn.removeClass('current');
                bodyMain.removeClass('has_contact_layer');
                contactLayer.fadeOut();
                return false;
            }            
        )
    }    
}
$(panelBodySwitch);
function panelBodySwitch(){
    var panelBody=$('.panel_side'),
        btnViewSwitch=$('.panel_side .btn_view_switch');
        btnViewSwitch.click(
            function(){
                if(btnViewSwitch.find('.ico').hasClass('ico_switch_r')){
                    panelBody.css({'width':'0','overflow':'hidden'});
                    btnViewSwitch.find('.ico').attr('class','ico ico_switch_l');                
                }
                else{
                    panelBody.css({'width':'340px','overflow':'auto'});
                    $('.ico_switch_l').attr('class','ico ico_switch_r');     
                }
                return false;
            }
        )
}
/*$(calendar);
function calendar(){
    var currentLangCode = 'zh-cn';
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        businessHours: true, // display business hours
        editable: true,
        events: [
            {
                title: 'Business Lunch',
                start: '2015-02-03T13:00:00',
                constraint: 'businessHours'
            },
            {
                title: 'Meeting',
                start: '2015-02-13T11:00:00',
                constraint: 'availableForMeeting', // defined below
                color: '#257e4a'
            },
            {
                title: 'Conference',
                start: '2015-02-18',
                end: '2015-02-20'
            },
            {
                title: 'Party',
                start: '2015-02-29T20:00:00'
            },

            // areas where "Meeting" must be dropped
            {
                id: 'availableForMeeting',
                start: '2015-02-11T10:00:00',
                end: '2015-02-11T16:00:00',
                rendering: 'background'
            },
            {
                id: 'availableForMeeting',
                start: '2015-02-13T10:00:00',
                end: '2015-02-13T16:00:00',
                rendering: 'background'
            },

            // red areas where no events can be dropped
            {
                start: '2015-02-24',
                end: '2015-02-28',
                overlap: false,
                rendering: 'background',
                color: '#ff9f89'
            },
            {
                start: '2015-02-06',
                end: '2015-02-08',
                overlap: false,
                rendering: 'background',
                color: '#ff9f89'
            }
        ]
    });
}*/