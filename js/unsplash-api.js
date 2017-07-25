/*
  TO DO

  -- Sill have to figure out how to hide applicationId from user
  Pass image width and height to API
  Add error checking
  Do we need UTM params on API call?
  Lint / Transpile / Minify

*/

var _0xe657=["\x33\x64\x32\x61\x62\x32\x62\x63\x66\x64\x61\x39\x63\x66\x30\x34\x34\x39\x62\x66\x32\x66\x32\x31\x34\x63\x61\x62\x39\x35\x31\x30\x38\x33\x61\x62\x33\x38\x31\x65\x31\x31\x30\x34\x61\x66\x63\x36\x61\x61\x37\x66\x37\x31\x32\x39\x34\x34\x66\x63\x63\x63\x61\x63"];const applicationId=_0xe657[0];
var url = 'https://api.unsplash.com/photos/random?client_id=' + applicationId;

$.get(url, function(data) {
  console.log(data);
  var imageURL = data.urls.full;
  $('body').css('background-image', 'url(\'' + imageURL + '\')');
  var photographer = data.user.name;
  var profileURL = 'https://unsplash.com/@' + data.user.username + '?utm_source=turtleTabE&utm_medium=referral&utm_campaign=api-credit';
  var photographerAttribution = '<a href=\'' + profileURL + '\'>' + photographer + '</a>';
  $('.photographer').html(photographerAttribution);
});
