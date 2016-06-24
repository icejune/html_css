function moreClick(){
	var btn_more=document.getElementById('more'),
		more_item=document.getElementsByClassName('more_item')[0],
		body_mask=document.getElementsByClassName('body_mask')[0];
	more_item.style.display='block';
	body_mask.style.display="block";		
}