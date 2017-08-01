
	(function(){
		'use strict';
		var longitude,latitude;
		const proxyCors="https://cors-anywhere.herokuapp.com/";
		const key='6fc0fc8f313f6942e3988506f10117d5';

		function onPositionRecieved(position){
			console.log(position+"is fired!");
			longitude=position.coords.longitude;
			latitude=position.coords.latitude;
			
			var url=proxyCors+'https://api.darksky.net/forecast/'+key+'/'+latitude+','+longitude+'?units=si&exclude=[minutely,hourly,daily]';
			
			$.getJSON(url,function(data){
				console.log(data);
			});
		}
		function locationNotRecieved(positionErr){
			console.log("damn!"+positionErr)
		}
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(onPositionRecieved,locationNotRecieved);

		}
	}());



