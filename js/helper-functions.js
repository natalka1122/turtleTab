/*********************************************************************
 * getFormattedDate(requestedDay) takes one parameter, a string value 
 * representing the chosen day; "yesterday", "today" or "tomorrow",
 * and returns the date as a string, formatted as DD-MM-YYYY
 * author: 8thday, created: 21/08/2017
 *********************************************************************/
function getFormattedDate(requestedDay) {
  let dayAdjustment = 0;
  let currentDateTime = new Date();
  let adjustedDateTime;
  let day, month, year;
  let formattedDate;

  if (requestedDay === "yesterday") {
    dayAdjustment = -1;
  }
  else if (requestedDay === "today") {
    dayAdjustment = 0;
  }
  else if (requestedDay === "tomorrow") {
    dayAdjustment = 1;
  }
  else {
    console.error("incorrect input to getFormattedDate function");
    return;
  }

  adjustedDateTime = new Date(currentDateTime.setDate(currentDateTime.getDate() + dayAdjustment));

  day = adjustedDateTime.getDate();
  // pad day of month with 0 where necessary
  day = day < 10 ? "0" + day : day;

  month = adjustedDateTime.getMonth() + 1;
  // pad month with 0 where necessary
  month = month < 10 ? "0" + month : month;

  year = adjustedDateTime.getFullYear();
  
  formattedDate = day + "-" + month + "-" + year;
  return formattedDate;
}

/*********************************************************************
 * deleteFromStorage(key) takes one parameter, a string value
 * representing the key of the item to delete.
 * If the key is not present in storage, fails silently.
 * author: 8thday, created: 21/08/2017
 *********************************************************************/
function deleteFromStorage(key) {
 
  localforage.removeItem(key).then(function() {
    return;
  })
    .catch(function(error) {
      console.error(error);
    });

}