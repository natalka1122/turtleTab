const imageAttributionReference = '#imageAttribution';
const unsplashReference = '#unsplash';
const photographerReference = '#photographer';
const locationReference = '#location';
const transitionSpeed = 800;

$(document).ready(function() {
  // alternatively, imageSchedule can be set to daily
  // (To do: allow user to toggle this setting)
  //var imageSchedule = 'hourly';

  // check if extension has been loaded recently
  // (frequency set by imageSchedule variable)
  
  //tabLoadedRecently();
  (function() {

    chrome.storage.sync.get('bgFrequency', function(options) {

      var imageSchedule = options.bgFrequency;
      var currentDateTime = new Date();

      if (imageSchedule === 'daily') {
        //console.log('daily');
        // serve a new background image each day
        var currentDate = currentDateTime.toLocaleDateString();

        if (localStorage.getItem('currentDate') === currentDate) {
          displayDataFromLocalStorage();
        }
        else {
          localStorage.setItem('currentDate', currentDate);
          // make a new API call    
          requestNewImage();
        }
      }
      else {
        // serve a new background image each hour
        // (triggered when new tab opened, or on refresh)
        //console.log('hourly');
        var currentHour = currentDateTime.getHours();

        if (localStorage.getItem('currentHour') === currentHour.toString()) {
          displayDataFromLocalStorage();
        }
        else {
          localStorage.setItem('currentHour', currentHour);
          // make a new API call    
          requestNewImage();
        }
      }
    });
  })();

  // request a new image from unsplash.com
  function requestNewImage() {

      var _0xe657=["\x33\x64\x32\x61\x62\x32\x62\x63\x66\x64\x61\x39\x63\x66\x30\x34\x34\x39\x62\x66\x32\x66\x32\x31\x34\x63\x61\x62\x39\x35\x31\x30\x38\x33\x61\x62\x33\x38\x31\x65\x31\x31\x30\x34\x61\x66\x63\x36\x61\x61\x37\x66\x37\x31\x32\x39\x34\x34\x66\x63\x63\x63\x61\x63"];const applicationId=_0xe657[0];
      var url = 'https://api.unsplash.com/photos/random?client_id=' + applicationId;
      var pictureMod="?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=srgb&fit=max&h=1080&orientation=landscape";

    $.get(url, function(data) {
      //console.log(data);
      var imageURL = data.urls.raw + pictureMod;
      var photographer = data.user.name;
      var photographerUsername = data.user.username;
      var profileURL = 'https://unsplash.com/@' + photographerUsername + '?utm_source=turtleTabE&utm_medium=referral&utm_campaign=api-credit';
      var photographerAttribution = '<a href=\'' + profileURL + '\' target=\'_blank\'>' + photographer + '</a>';
      var imageLocation = data.user.location;
      // Save JSON in localStorage
      localStorage.setItem('imageURL', imageURL);
      localStorage.setItem('attribution', photographerAttribution);
      if(imageLocation != null) {
        localStorage.setItem('imageLocation', imageLocation);
      }
      else {
        localStorage.removeItem('imageLocation');
      }

      // display image
      displayDataFromLocalStorage()
    });
  }

  // display data from localStorage
  function displayDataFromLocalStorage() {

    if(localStorage.getItem('imageURL') != null) {
      $(unsplashReference).show(transitionSpeed);
      $('body').css('background-image', 'url(\'' + localStorage.getItem('imageURL') + '\')');
    }
    else {
      $(unsplashReference).hide();
    }

    if(localStorage.getItem('attribution') != null) {
      $(photographerReference).show(transitionSpeed);
      $(photographerReference).html(localStorage.getItem('attribution'));
    }
    else {
      $(photographerReference).hide();
    }

    if(localStorage.getItem('imageLocation') != null && localStorage.getItem('imageLocation') != 'null') {
      $(locationReference).show(transitionSpeed);
      $(locationReference).html(localStorage.getItem('imageLocation'));
    }
    else {
      $(locationReference).hide();
    }
    $(imageAttributionReference).show(transitionSpeed);
  }
});
