function displayQuote(todaysDateStr) {
  // if an quote with given date exists in storage, display it
  let todaysQuote = "ttQuote-" + todaysDateStr;

  localforage.getItem(todaysQuote).then(function(obj) {
    // if it exists in storage
    if(obj) {
      addQuoteToDOM(obj.quoteText, obj.quoteAuthor);
    }
    // else display an offline image
    else {
      useOfflineQuote(todaysQuote); 
    }
  }).catch(function(error) {
    console.log(error);
  });
}

function useOfflineQuote(todaysQuote) {
  let offlineQuotes = [
    {
      "quote-0": "I never did a day\'s work in my life, it was all fun.",
      "author-0": "Thomas Edison - Edison & Ford Quote Book (2003)"
    },
    {
      "quote-1": "Ever tried. Ever failed. No matter. Try Again. Fail again. Fail better.",
      "author-1": "Samuel Beckett - Worstward Ho (1983)"
    },
    {
      "quote-2": "We are what we repeatedly do. Excellence, then, is not an act but a habit.",
      "author-2": "William Durant - The Story of Philosophy (1926)"
    },
    {
      "quote-3": "There is no elevator to success - you have to take the stairs.",
      "author-3": "Unknown"
    },
    {
      "quote-4": "... you must go on, I can\'t go on, I\'ll go on.",
      "author-4": "Samuel Beckett - The Unnamable (1953)"
    },
    {
      "quote-5": "You can often change your circumstances by changing your attitude",
      "author-5": "Eleanor Roosevelt"
    }    
  ];

  let offlineQuoteFlag;
  let quoteText;
  let quoteAuthor;

  // offlineQuoteFlag keeps track of which offline quote to display next (stored value or 0)
  offlineQuoteFlag = Number(localStorage.getItem("offlineQuoteFlag")) || 0;

  // construct quote variables
  quoteText = offlineQuotes[offlineQuoteFlag]["quote-" + offlineQuoteFlag];
  quoteAuthor = offlineQuotes[offlineQuoteFlag]["author-" + offlineQuoteFlag];

  addQuoteToDOM(quoteText, quoteAuthor);
  stowOfflineQuote(todaysQuote, quoteText, quoteAuthor);

  // increment image number to prepare for next use
  let offlineQuotesLength = offlineQuotes.length;
  offlineQuoteFlag = (offlineQuoteFlag + 1) % offlineQuotesLength;
  localStorage.setItem("offlineQuoteFlag", offlineQuoteFlag);
}

function addQuoteToDOM(quoteText, quoteAuthor) {
  const quoteReference = document.querySelector("#quote");
  const quoteTextReference = document.querySelector("#quoteText");
  const quoteAuthorReference = document.querySelector("#quoteAuthor");
  const forismaticReference = document.querySelector("#forismatic");
  quoteReference.style.display = "inline-block";
  quoteTextReference.innerHTML = quoteText;
  quoteAuthorReference.innerHTML = "- " + quoteAuthor;
}

function stowOfflineQuote(quoteName, quoteText, quoteAuthor) {
  // save offline quote in IndexedDB (i.e. make it today's quote)
  let quoteObj = {
    "quoteText": quoteText,
    "quoteAuthor": quoteAuthor
  };
  localforage.setItem(quoteName, quoteObj)
  .then(function(value){})
  .catch(function(error) {
    console.log(error);
  });
}

function preloadQuote(tomorrowsDateStr) {
  // if forismatic quote with tomorrow's date does not already 
  // exist in storage, download one    
  let tomorrowsQuote = "ttQuote-" + tomorrowsDateStr;
  localforage.getItem(tomorrowsQuote).then(function(response) {
    if(true) {
      fetchNewQuote(tomorrowsQuote);
    }
  }).catch(function(error) {
    console.log(error);
  });
}

function fetchNewQuote(tomorrowsQuote) {
  let url = proxyCors + "https://api.forismatic.com/api/1.0/";
  url += "?method=getQuote&format=json&lang=en";

  $.getJSON(url, function(json) {
    
    let quoteText = json.quoteText;
    let quoteAuthor = json.quoteAuthor;
    if (quoteAuthor == "") {
      quoteAuthor = "Unknown";
    }
    // package quote data as an object
    let quoteObj = {
      "quoteText": quoteText,
      "quoteAuthor": quoteAuthor
    };

    // save quoteObj (use tomorrow's date in name)
    saveQuote(tomorrowsQuote, quoteObj);
  });
}

function saveQuote(tomorrowsQuote, quoteObj) {

  localforage.setItem(tomorrowsQuote, quoteObj).then(function(value) {})
  .catch(function(err) {
    console.log(err);
  });    
}

/*function deleteOldQuote(yesterdaysDateStr) {
  let yesterdaysQuote = "ttQuote-" + yesterdaysDateStr;
  deleteFromStorage(yesterdaysQuote);
}*/
