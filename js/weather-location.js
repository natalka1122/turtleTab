const proxyCors="https://cors-anywhere.herokuapp.com/";
var _0x8bc8=["\x36\x66\x63\x30\x66\x63\x38\x66\x33\x31\x33\x66\x36\x39\x34\x32\x65\x33\x39\x38\x38\x35\x30\x36\x66\x31\x30\x31\x31\x37\x64\x35"];const key=_0x8bc8[0];
const units="si";
const language="en";
const weatherText="#weather";
const weatherBlock="#weather-comp";
const weatherIcon="#icon";
var longitude,latitude;

function getHtml5Location() {
  function success(position) {
    latitude=position.coords.latitude;
    longitude=position.coords.longitude;
    showWeather();
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, getIpLocation);
  } else {
    getIpLocation();
  }
}

function getIpLocation() {
  var jsonQuery=proxyCors+"http://freegeoip.net/json/";

  $.getJSON(jsonQuery, function(json) {
    latitude=json.latitude;
    longitude=json.longitude;
    showWeather();
  });    
}

function showWeather(){
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
  var jsonQuery=proxyCors+"https://api.darksky.net/forecast/"+key+"/"+latitude+","+longitude+"?units="+units+"&lang="+language;
  $.getJSON(jsonQuery, function(json) {
    var html="";
    html+=Math.round(json.currently.apparentTemperature)+"&#8451";
    $(weatherText).html(html);
    $(weatherIcon).html("<img src="+icons[json.currently.icon]+" width='50' height='50'></img>");
    $(weatherBlock).show(800);
  });
}

(function(){
  getHtml5Location();   
}());