$(document).ready(function() {

  // check if extension has been loaded today
  function hasExtensionLoadedToday() {
    var currentDate = new Date().toLocaleDateString();
    
    if (localStorage.getItem('currentDate') == currentDate) {
      return true;
    }
    else {
      localStorage.setItem('currentDate', currentDate);
      return false;
    }
  }

  // request a new image from unsplash.com
  function requestNewImage() {

      var _0xe657=["\x33\x64\x32\x61\x62\x32\x62\x63\x66\x64\x61\x39\x63\x66\x30\x34\x34\x39\x62\x66\x32\x66\x32\x31\x34\x63\x61\x62\x39\x35\x31\x30\x38\x33\x61\x62\x33\x38\x31\x65\x31\x31\x30\x34\x61\x66\x63\x36\x61\x61\x37\x66\x37\x31\x32\x39\x34\x34\x66\x63\x63\x63\x61\x63"];const applicationId=_0xe657[0];
      var url = 'https://api.unsplash.com/photos/random?client_id=' + applicationId;
      var pictureMod="?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=srgb&fit=max&h=1080&orientation=landscape";

    $.get(url, function(data) {
      //console.log(data);
      var imageURL = data.urls.raw+pictureMod;
      var photographer = data.user.name;
      var profileURL = 'https://unsplash.com/@' + data.user.username + '?utm_source=turtleTabE&utm_medium=referral&utm_campaign=api-credit';
      var photographerAttribution = '<a href=\'' + profileURL + '\'>' + photographer + '</a>';
      var imageLocation = data.user.location;
      // Save JSON in localStorage
      localStorage.setItem('imageURL', imageURL);
      localStorage.setItem('attribution', photographerAttribution);

      if(imageLocation != null) {
        localStorage.setItem('imageLocation', imageLocation);
      }

      // display image
      displayDataFromLocalStorage()
    });
  }

  // display data from localStorage
  function displayDataFromLocalStorage() {

    if(localStorage.getItem('imageURL') != null) {
      $('body').css('background-image', 'url(\'' + localStorage.getItem('imageURL') + '\')');
    }
    else {
      $('#unsplash').hide();
    }

    if(localStorage.getItem('attribution') != null) {
      $('#photographer').html(localStorage.getItem('attribution'));
    }
    else {
      $('#photographer').hide();
    }

    if(localStorage.getItem('imageLocation') != null) {
      $('#location').html(localStorage.getItem('imageLocation'));
    }
    else {
      $('#location').hide();
    }
  }

  // change background image once a day
  function oncePerDay() {
    
    if (hasExtensionLoadedToday() && localStorage.getItem('imageURL') != null) {
      displayDataFromLocalStorage()
    }
    else {
      // make a new API call    
      requestNewImage();        
    }  
  }
  oncePerDay();
});
