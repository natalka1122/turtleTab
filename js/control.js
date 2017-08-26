"use strict";

(function() {

  //let yesterdaysDateStr = getFormattedDate("yesterday");
  let todaysDateStr = getFormattedDate("today");
  let tomorrowsDateStr = getFormattedDate("tomorrow");

  // display today's background and quote
  displayBackground(todaysDateStr);
  displayQuote(todaysDateStr);

  // load tomorrow's background and quote
  preloadBackground(tomorrowsDateStr);
  preloadQuote(tomorrowsDateStr);

  // delete old backgrounds and quotes
  deleteOldData(todaysDateStr, tomorrowsDateStr)

})();