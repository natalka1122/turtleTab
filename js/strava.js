// get date one week ago (based on unix time stamp, in seconds)
const secondsInWeek = 7 * 24 * 60 * 60;
var dateNow = Date.now() / 1000;
var oneWeek = dateNow - secondsInWeek;
var accessToken = "f6a9cab6e89b1dcd702561d809e77a84878e8925";

$.get('https://www.strava.com/api/v3/activities?access_token=' + accessToken + '&after=' + oneWeek, function(data) {
  console.log(data);
  var activityCount = data.length;
  var activityType;
  var distance;
  var totalDistance = 0;
  var activities = [];

  for (var i = 0; i < activityCount; i++) {
    activityType = data[i].type;
    distance = data[i].distance;
    totalDistance += distance;
    activities.push([activityType, distance]);
    distance = addUnits(activityType, distance);
    $('#strava-data').append('<p>Activity: <span class="activityType">' + activityType + '</span> Distance: <span class="distance">' + distance + '</span></p>');

  }
  $('#activityCount').html(activityCount);
  $('#strava-data').append('<p>Total Distance: <span class="totalDistance">' + (totalDistance / 1000).toFixed(2) + 'km</span></p>');
});

function addUnits(type, dist) {
  return (dist / 1000).toFixed(2) + 'km';
}
