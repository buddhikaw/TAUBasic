$(function () {
	
}());

$("#btn1").click(function() {	  
	getBusTimes(55181,86);	  
});

$("#btn2").click(function() {	  
	getBusTimes(55039,86);	  
});


function parseBustime(millis,type) {	
	if(millis !="N/A") {
		if(millis > 0){
			var minutes = Math.floor(millis / 60000);
			var seconds = ((millis % 60000) / 1000).toFixed(0);
			var text = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
			if(type == "DD"){
				text = text + "(D)";
			}
			
			return text;
		}	
		else return "Arr"; 
	}
	return millis;
}


function getBusTimes(busStopId,busId){
	$("#pWelcome").remove();
	if(busStopId == "55181")
		$(".pClassSummary").text(busStopId+"opp.yck | "+busId);
	else if(busStopId == "55039")
		$(".pClassSummary").text(busStopId+"NcsHub | "+busId);
	else 
		$(".pClassSummary").text(busStopId+" | "+busId);
	
	$(".pClassDetail").text('Wait lah...!');
	  
	  $.ajax({
		    type:"GET",
		    url:"https://buddhikasgbustimeproxy.azurewebsites.net/api/bustime/?busStopId="+busStopId+"&busId="+busId,
		    success: function(data) {		    	
		      $('.pClassDetail').text(parseBustime(data.FirstBus,data.FirstBusType)+" | "+parseBustime(data.SecondBus,data.SecondBusType) +" | "+parseBustime(data.ThirdBus,data.ThirdBusType));
		      //$('#pSecondRow').text(parseBustime(data.ThirdBus));
		    }
		  });
	  
}