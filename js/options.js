"use strict";
const imageScheduleDefault = "daily";
const quoteScheduleDefault = "daily";

// saves options to chrome.storage
function save_options() {
  var bgFrequency;
  var quoteFrequency;

  // check options for background image
  if (document.getElementById("bgHourly").checked) {
    bgFrequency = "hourly";
  }
  else {
    bgFrequency = "daily";
  }

  // check options for quote
  if (document.getElementById("quoteHourly").checked) {
    quoteFrequency = "hourly";
  }
  else {
    quoteFrequency = "daily";
  }

  // save options
  chrome.storage.sync.set({
    bgFrequency: bgFrequency,
    quoteFrequency: quoteFrequency
  }, function() {
    // update status to let user know options were saved
    var status = document.getElementById("status");
    status.textContent = "Options saved.";
    setTimeout(function() {
      status.textContent = "";
    }, 2000);
  });
}

// restores options using preferences stored in chrome.storage
function restore_options() {
  // use default value bgFrequency = "daily" (imageScheduleDefault)
  // use default value quoteFrequency = "daily" (quoteScheduleDefault)
  chrome.storage.sync.get({
    bgFrequency: imageScheduleDefault,
    quoteFrequency: quoteScheduleDefault
  }, function(items) {

    if (items.bgFrequency == "hourly") {
      document.getElementById("bgHourly").setAttribute("checked", "checked");
    }
    else {
      document.getElementById("bgDaily").setAttribute("checked", "checked");
    }

    if (items.quoteFrequency == "hourly") {
      document.getElementById("quoteHourly").setAttribute("checked", "checked");
    }
    else {
      document.getElementById("quoteDaily").setAttribute("checked", "checked");
    }

  });
}

document.addEventListener("DOMContentLoaded", function(e) {
  restore_options();
});

document.getElementById("save").addEventListener("click", save_options);
