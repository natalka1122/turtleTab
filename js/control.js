"use strict";

(function() {

  let yesterdaysDateStr = getFormattedDate("yesterday");
  let todaysDateStr = getFormattedDate("today");
  let tomorrowsDateStr = getFormattedDate("tomorrow");

  // display today's background
  displayBackground(todaysDateStr);

  // display today's quote
  displayQuote(todaysDateStr);

  // load tomorrow's background
  preloadBackground(tomorrowsDateStr);

  // load tomorrow's quote
  preloadQuote(tomorrowsDateStr);

  // delete yesterday's background
  deleteOldBackground(yesterdaysDateStr)

  // delete yesterday's quote
  deleteOldQuote(yesterdaysDateStr)

})();