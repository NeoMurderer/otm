var win  = chrome.extension.getBackgroundPage();
  $(function(){
  	chrome.browserAction.setBadgeBackgroundColor({color :[255, 0, 0, 255]})
  	var audio = win.get_audio();
  	var state = $(audio).attr("data-state")
  	var active_station = $(audio).attr("src")
  	var volume = audio.volume;
  	$(".range").val(volume*100)
  	$('.circle').css("left",volume*100+"%")
  	$(".fm").find("li[data-id='"+active_station+"']").addClass("active")
  	if(state=="play")
  		$(".play").attr('data-type',"stop").find("img").attr("src","images/pause.png");
	$(".play").click(function(){
		var type = $(this).attr("data-type");
		if(type=="play")
		{
			var audio = win.play();

			$(this).attr('data-type',"stop").find("img").attr("src","images/pause.png");
		  	$(".fm").find("li[data-id='"+audio+"']").addClass("active")
		}
		else {
			win.stop();
			$(this).attr('data-type','play').find("img").attr("src","images/play.png");
		}
	})
	$(".stop").click(function(){
		win.stop();
	})
	$(".prev").click(function(){
		var active = $(".fm").find(".active")
		var prev = active.prev().length ? active.prev() : $(".fm").find("li").last();
		active.removeClass("active");
		prev.addClass("active");
		win.play(prev.attr("data-id"));
		$(".play").attr('data-type',"stop").find("img").attr("src","images/pause.png");
	})
	$(".next").click(function(){
		var active = $(".fm").find(".active")
		var next = active.next().length ? active.next() : $(".fm").find("li").first();
		console.log(next);
		active.removeClass("active");
		next.addClass("active");
		win.play(next.attr("data-id"));
		$(".play").attr('data-type',"stop").find("img").attr("src","images/pause.png");
	})
	$(".fm li").click(function(){
		$(".fm").find(".active").removeClass("active");
		var _this = $(this);
		_this.addClass("active");

		win.play(_this.attr("data-id"));
		$(".play").attr('data-type',"stop").find("img").attr("src","images/pause.png");
	})
	/*
	$(".fm li.active").click(function(){
		$(".fm").find(".active").removeClass("active");
		var _this = $(this);
		win.stop();
		$(".play").attr('data-type',"play").find("img").attr("src","images/play.png");
	})
	*/
	$(".range").change(function () {

		$(".volume").find("img").attr({
			"src":"images/volume.png",
			"class":"on"
		})
		var size = $(this).val();
		$('.circle').css("left",size+"%")
		win.volume(size/100);
	})
	$(".volume").click(function () {
		if($(this).find("img").hasClass("on"))
		{
			var volume = $(".range").val();
			$(this).find("img").attr({
				"src":"images/volumeoff.png",
				"class":"off"
			})
			$(".range").attr("data-volume",volume).val(0)
			$('.circle').css("left",0+"%")
			win.volume(0);
		}
		else {

			$(this).find("img").attr({
				"src":"images/volume.png",
				"class":"on"
			})
			var volume = $(".range").attr("data-volume");
			$(".range").val(volume)
			$('.circle').css("left",volume+"%")
			win.volume(volume/100);
		}
	})
})