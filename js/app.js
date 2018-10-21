var currentPg = 1;

var myVar = setInterval(setBusTimes, 20000);

function setBusTimes() {
	if(currentPg == 1){
		getBusTimes(55181,86);
	}
	else if (currentPg == 2) {
		getBusTimes(55039,86);
	}
}

(function () {
	window.addEventListener("tizenhwkey", function (ev) {
		var activePopup = null,
			page = null,
			pageid = "";

		if (ev.keyName === "back") {
			activePopup = document.querySelector(".ui-popup-active");
			page = document.getElementsByClassName("ui-page-active")[0];
			pageid = page ? page.id : "";

			if (pageid === "one" && !activePopup) {
				try {
					clearInterval(myVar);
					tizen.application.getCurrentApplication().exit();
				} catch (ignore) {
				}
			} else {
				window.history.back();
			}
		}
	});
	
	document.addEventListener('rotarydetent', function(ev) {
	    var direction = ev.detail.direction;
	    if(direction === "CW"){
	    	currentPg = 2;
	    	tau.changePage('#two');
	    	getBusTimes(55039,86);	    	
	    }	    	
	    else {
	    	currentPg = 1;
	    	tau.changePage('#one');
	    	getBusTimes(55181,86);	
		}
	});
}());