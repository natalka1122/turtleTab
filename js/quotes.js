//const proxyCors = "https://cors-anywhere.herokuapp.com/";
const quoteReference = "#quote";
const quoteTextReference = "#quoteText";
const quoteAuthorReference = "#quoteAuthor";
const forismaticReference = "#forismatic";
//const transitionSpeed = 800;
const quoteScheduleDefault = "daily";

$(document).ready(function() {

  // check if extension has been loaded recently
  // (frequency set by quoteSchedule variable)
  
  (function() {

    chrome.storage.sync.get("quoteFrequency", function(options) {
      if (chrome.runtime.lastError) {
        var quoteSchedule = quoteScheduleDefault;
      }
      else {
        var quoteSchedule = options.quoteFrequency;
      }
      
      var currentDateTime = new Date();

      if (quoteSchedule === "daily") {
        // serve a new quote each day
        var currentDate = currentDateTime.toLocaleDateString();

        if (localStorage.getItem("lastQuoteDate") === currentDate) {
          displayDataFromLocalStorage();
        }
        else {
          localStorage.setItem("lastQuoteDate", currentDate);
          // make a new API call    
          requestNewQuote();
        }
      }
      else {
        // serve a new quote each hour
        // (triggered when new tab opened, or on refresh)
        var currentHour = currentDateTime.getHours();

        if (localStorage.getItem("lastQuoteHour") === currentHour.toString()) {
          displayDataFromLocalStorage();
        }
        else {
          localStorage.setItem("lastQuoteHour", currentHour);
          // make a new API call    
          requestNewQuote();
        }
      }
    });
  })();

  // request a new quote from forismatic.com
  function requestNewQuote() {
    var url = proxyCors;
    url += "http://api.forismatic.com/api/1.0/";
    url += "?method=getQuote&format=json&lang=en";
    $.get(url, function(quoteData) {
      //console.log(quoteData);
      var quoteText = quoteData.quoteText;
      var quoteAuthor = quoteData.quoteAuthor;
      if (quoteAuthor == "") {
        quoteAuthor = "Unknown";
      }      
      // Save data in localStorage
      localStorage.setItem("quoteText", quoteText);
      localStorage.setItem("quoteAuthor", quoteAuthor);
      // then display it
      displayDataFromLocalStorage()
    });
  }

  // display data from localStorage
  function displayDataFromLocalStorage() {

    if(localStorage.getItem("quoteText") != null) {
      $(quoteReference).show(transitionSpeed);
      $(quoteTextReference).html(localStorage.getItem("quoteText"));
      $(forismaticReference).html("<small>Quotes courtesy of <a href=\"https://forismatic.com/en\" target=\"blank\">forismatic.com</a></small>");
    }
    else {
      $(quoteReference).hide();
      // make a new API call    
      requestNewQuote();
    }

    if(localStorage.getItem("quoteAuthor") != null) {
      $(quoteAuthorReference).show();
      $(quoteAuthorReference).html("- " + localStorage.getItem("quoteAuthor"));
    }
    else {
      $(quoteAuthorReference).hide();
    }
  }
});
