$(function () {
	
}());

$('.btn').click(function() {	  
	getBusTimes();	  
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


function getBusTimes(){
	var busStopId = 55181;
	var busId=86;
	$("#pWelcome").remove();
	$("#pSummary").text(busStopId+"opp.yck | "+busId);
	$("#pFirst").text('loading . . .');
	  
	  $.ajax({
		    type:"GET",
		    url:"https://buddhikasgbustimeproxy.azurewebsites.net/api/bustime/?busStopId="+busStopId+"&busId="+busId,
		    success: function(data) {		    	
		      $('#pFirstRow').text(parseBustime(data.FirstBus,data.FirstBusType)+" | "+parseBustime(data.SecondBus,data.SecondBusType) +" | "+parseBustime(data.ThirdBus,data.ThirdBusType));
		      //$('#pSecondRow').text(parseBustime(data.ThirdBus));
		    }
		  });
	  
}