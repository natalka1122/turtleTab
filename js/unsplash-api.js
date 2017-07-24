/*
  TO DO

  Figure out how to hide applicationId from user
  Pass image width and height to API
  Add error checking
  Do we need UTM params on API call?
  Lint / Transpile / Minify

*/

const applicationId = '3d2ab2bcfda9cf0449bf2f214cab951083ab381e1104afc6aa7f712944fcccac';
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
