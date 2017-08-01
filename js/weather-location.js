const proxyCors='https://cors-anywhere.herokuapp.com/';

	(function(){
		'use strict';
		var longitude,latitude;

		function onPositionRecieved(position){
			console.log(position);
			longitude=position.coords.longitude;
			latitude=position.coords.latitude;
			var URL=proxyCors+'https://api.darksky.net/forecast/6fc0fc8f313f6942e3988506f10117d5/'+latitude+','+longitude+'?units=si&exclude=[minutely,hourly,daily]';
			$.getJSON(URL,function(data){
				console.log(data);
			});
		}
		function locationNotRecieved(positionErr){
			console.log("Error"+positionErr)
		}
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(onPositionRecieved,locationNotRecieved);

		}
	}());



