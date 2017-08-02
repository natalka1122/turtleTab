const proxyCors='https://cors-anywhere.herokuapp.com/';

	(function(){
		'use strict';
		var longitude,latitude;
		const proxyCors="https://cors-anywhere.herokuapp.com/";
		const key='6fc0fc8f313f6942e3988506f10117d5';
		var list  = [
		        "clear-day", "clear-night", "partly-cloudy-day",
		        "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
		        "fog"
		      ],
		      i;
		      const icons={
		      	"clear-day":"icons/001lighticons-01.png",
		      	"clear-night":"icons/001lighticons-02.png",
		      	"partly-cloudy-day":"icons/001lighticons-08.png",
		      	"partly-cloudy-night":"icons/001lighticons-09.png",
		      	"cloudy":"icons/001lighticons-25.png",
		      	"rain":"icons/001lighticons-18.png",
		      	"sleet":"icons/001lighticons-23.png",
		      	"snow":"icons/001lighticons-24.png",
		      	"wind":"icons/001lighticons-06.png",
		      	"fog":"icons/001lighticons-13.png"
		      };

		function onPositionRecieved(position){
			//console.log(position);
			longitude=position.coords.longitude;
			latitude=position.coords.latitude;
			var url=proxyCors+'https://api.darksky.net/forecast/'+key+'/'+latitude+','+longitude+'?units=si&exclude=[minutely,hourly,daily]';
			
			$.getJSON(url,function(data){
				var URL=proxyCors+'https://api.darksky.net/forecast/'+key+'/'+latitude+','+longitude+'?units=si&exclude=[minutely,hourly,daily]';
				$.getJSON(URL,function(data){
					$("#weather").html(Math.trunc(data.currently.apparentTemperature)+"&#8451");
					$("#icon").html("<img src="+icons[data.currently.icon]+" width='50' height='50'></img>");
				});
			});
		}
		function locationNotRecieved(positionErr){
			console.log("damn!"+positionErr)
		}
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(onPositionRecieved,locationNotRecieved);

		}
	}());