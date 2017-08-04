const imageScheduleDefault = 'daily';

// saves options to chrome.storage
function save_options() {
  var bgFrequency;
  if (document.getElementById('bgHourly').checked) {
    bgFrequency = 'hourly';
  }
  else {
    bgFrequency = 'daily';
  }
  chrome.storage.sync.set({
    bgFrequency: bgFrequency
  }, function() {
    // update status to let user know options were saved
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 2000);
  });
}

// restores options settings using preferences stored in chrome.storage
function restore_options() {
  // use default value bgFrequency = 'daily' (imageScheduleDefault)
  chrome.storage.sync.get({
    bgFrequency: imageScheduleDefault
  }, function(items) {
    if (items.bgFrequency == 'hourly') {
      document.getElementById('bgHourly').setAttribute('checked', 'checked');
    }
    else {
      document.getElementById('bgDaily').setAttribute('checked', 'checked');
    }    
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
