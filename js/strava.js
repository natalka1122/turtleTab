// get date one week ago (based on unix time stamp, in seconds)
const secondsInWeek = 7 * 24 * 60 * 60;
var dateNow = Date.now() / 1000;
var oneWeek = dateNow - secondsInWeek;
var accessToken = "f6a9cab6e89b1dcd702561d809e77a84878e8925";
//console.log(oneWeek);

$.get('https://www.strava.com/api/v3/activities?access_token=' + accessToken + '&after=' + oneWeek, function(data) {
  console.log(data);
  var activityCount = data.length;
  var activityType = data[0].type;
  var distance = data[0].distance / 1000;
  $('#activityCount').html(activityCount);
  $('#activityType').html(activityType);  
  $('#distance').html(distance);
});